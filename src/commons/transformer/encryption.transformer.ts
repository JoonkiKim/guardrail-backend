import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { ValueTransformer } from 'typeorm';

const SUPPORTED_KEY_LENGTH = 32;
const IV_LENGTH = 12;

const resolveKey = (): Buffer => {
  const rawKey = process.env.DATA_ENCRYPTION_KEY;
  if (!rawKey) {
    throw new Error(
      'DATA_ENCRYPTION_KEY is not defined. Set a 32-byte key (base64, hex, or utf8).',
    );
  }

  const candidates = [
    Buffer.from(rawKey, 'base64'),
    Buffer.from(rawKey, 'hex'),
    Buffer.from(rawKey, 'utf8'),
  ].filter((buf) => buf.length === SUPPORTED_KEY_LENGTH);

  if (!candidates.length) {
    throw new Error(
      'DATA_ENCRYPTION_KEY must resolve to 32 bytes when decoded from base64, hex, or utf8.',
    );
  }

  return candidates[0];
};

const encryptionKey = resolveKey();

export class EncryptionTransformer implements ValueTransformer {
  to(value: string | null | undefined): string | null | undefined {
    if (!value) return value;

    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv('aes-256-gcm', encryptionKey, iv);
    const encrypted = Buffer.concat([
      cipher.update(value, 'utf8'),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();

    return Buffer.concat([iv, tag, encrypted]).toString('base64');
  }

  from(value: string | null | undefined): string | null | undefined {
    if (!value) return value;

    const payload = Buffer.from(value, 'base64');
    const iv = payload.subarray(0, IV_LENGTH);
    const tag = payload.subarray(IV_LENGTH, IV_LENGTH + 16);
    const ciphertext = payload.subarray(IV_LENGTH + 16);

    const decipher = createDecipheriv(
      'aes-256-gcm',
      encryptionKey,
      Buffer.from(iv),
    );
    decipher.setAuthTag(Buffer.from(tag));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(ciphertext)),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }
}

export const encryptionTransformer = new EncryptionTransformer();
