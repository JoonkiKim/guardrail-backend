import { createCipheriv, randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

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
      `Invalid encryption key length. Expected ${SUPPORTED_KEY_LENGTH} bytes.`,
    );
  }

  return candidates[0];
};

const encryptionKey = resolveKey();

function encrypt(value: string): string {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv('aes-256-gcm', encryptionKey, iv);
  const encrypted = Buffer.concat([
    cipher.update(value, 'utf8'),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

// SQL 문자열 이스케이프 (작은따옴표 처리)
function escapeSqlString(str: string): string {
  return str.replace(/'/g, "''");
}

const PAVLOV_DATA = [
  { stimulus: '거의 모든 상황', response: '10초 세며 숨 고르기' },
  {
    stimulus: '갈등',
    response: '"내가 맞다는 걸 증명해야 할 필요가 정말 있는가?"',
  },
  {
    stimulus: '갈등',
    response: '"상대방의 사정, 상대방의 의견을 궁금해 하고 있는가?"',
  },
  {
    stimulus: '갈등',
    response: '"이겨야 할 대상은 없다. 이해해야 할 사람만 있을 뿐이다."',
  },
  { stimulus: '감정적 동요', response: '"이건 무슨 감정인가?"' },
  {
    stimulus: '감정적 동요',
    response: '"내가 지금 배고프거나 피곤한가? 아님 진짜 감정인가?"',
  },
  { stimulus: '감정적 동요', response: '"10년 뒤에도 중요한 일인가?"' },
  {
    stimulus: '감정적 동요',
    response: '"이 순간은 전체 우주에서 얼마나 미세한가?"',
  },
  { stimulus: '감정적 동요', response: '자리에서 일어나 자극 없이 5분 걷기' },
  { stimulus: '감정적 동요', response: '목 뒤에 찬물 묻히기' },
  { stimulus: '감정적 동요', response: '"지금 해결하지 않아도 괜찮은가?"' },
  {
    stimulus: '계획이 틀어졌을 때',
    response: '"전체 그림에서 정말 중요한 부분인가?"',
  },
  {
    stimulus: '계획이 틀어졌을 때',
    response: '"지금 이 상황에서 통제 가능한 건 뭔가?"',
  },
  { stimulus: '데드타임', response: '언어 전환 (예: 외국어 문장 1개 암기)' },
  { stimulus: '데드타임', response: '짧은 신체 루틴 (월싯 1분)' },
  { stimulus: '좋은 의사결정', response: '"꼭 지금해야 하는가?"' },
  { stimulus: '좋은 의사결정', response: '"감정인가 판단인가?"' },
  {
    stimulus: '좋은 의사결정',
    response: '"핵심 기준은 뭔가? 그걸 만족하는 선택은?"',
  },
  {
    stimulus: '좋은 의사결정',
    response: '"내가 죽기 직전에 이 선택을 어떻게 평가할까?"',
  },
  {
    stimulus: '좋은 의사결정',
    response: '"10년 후 모든 걸 이룬 미래의 나라면 이 일에 어떻게 접근할까?"',
  },
  {
    stimulus: '좋은 의사결정',
    response: '"이 결정이 10년 후 내 삶에 어떤 의미가 있을까?"',
  },
  { stimulus: '의사결정으로 인한 스트레스', response: '"위임할 수 있는가?"' },
  { stimulus: '의사결정으로 인한 스트레스', response: '"가역적인가?"' },
  {
    stimulus: '의사결정으로 인한 스트레스',
    response: '"(완벽하지 않더라도) 충분히 좋은가? 좋다면 그렇게 하자."',
  },
  {
    stimulus: '의사결정으로 인한 스트레스',
    response: '"최악의 경우엔 어떻게 되나? 난 그걸 감당할 수 있나?"',
  },
  {
    stimulus: '문제 해결',
    response: '"이 문제를 해결하는 완전히 다른 방식은 없을까?"',
  },
  {
    stimulus: '문제 해결',
    response: '"처음부터 다시 시작한다면, 진짜 문제가 무엇이었나?"',
  },
  { stimulus: '소비 충동', response: '"좋다. 근데 필요하진 않다."' },
  {
    stimulus: '소비 충동',
    response: '"일시불이래도 살 것인가? (10만 원 이하는 무조건 일시불)"',
  },
  {
    stimulus: '소비 충동',
    response:
      '"가격을 떠나, 이걸 구매하는 데에 나의 시간, 집중력, 의사결정에 따른 정신적 피로를 투자할 가치가 있는가?"',
  },
  { stimulus: '소비 충동', response: '그래도 사고 싶으면 소비 리스트에 기록' },
  {
    stimulus: '콘텐츠 소비',
    response: '"여기에 시간 쓰는 게 정말 가치 있나?"',
  },
  {
    stimulus: '콘텐츠 소비',
    response: '"난 지금 이걸 정말로 궁금해하나, 원하나?"',
  },
  { stimulus: '의사소통', response: '이름 기억하고 시작' },
  { stimulus: '의사소통', response: '"듣기 비율이 얼마나 되는가?"' },
  {
    stimulus: '의사소통',
    response: '"상대방의 얘기하고 싶어하는 것은 무엇인가?"',
  },
  {
    stimulus: '의사소통',
    response: '"상대의 감정을 얻었는가? 이성보다 감정이 먼저다."',
  },
  {
    stimulus: '다맥락에 압도될 때',
    response: '모든 맥락을 두서없이 적고 가장 빨리 끝낼 수 있는 하나 먼저 처리',
  },
  {
    stimulus: '시간 허투루 보낼 때',
    response: '"10분은 깨어있는 시간의 1%다."',
  },
  { stimulus: '일 시작이 안 될 때', response: '3분으로 쪼개서 바로 한다' },
  { stimulus: '일이 열렸을 때', response: '바로 메모' },
  {
    stimulus: '자기 전',
    response: '오늘 하루 중 후회되는 (스스로에게 떳떳하지 못한) 행동이 있었나?',
  },
  {
    stimulus: '회의감',
    response: '지금 이 회의는 문제 해결을 위한 건가, 자기소모인가?',
  },
];

function generateSql() {
  const userId = '5636f816-00b4-40e9-87c3-b39882cf4e57';

  // stimulus별로 그룹화
  const groupedData = PAVLOV_DATA.reduce((acc, item) => {
    if (!acc[item.stimulus]) {
      acc[item.stimulus] = [];
    }
    acc[item.stimulus].push(item.response);
    return acc;
  }, {} as Record<string, string[]>);

  console.log('-- 파블로프 데이터 SQL INSERT 문 생성');
  console.log('-- 유저 ID:', userId);
  console.log('-- 생성 시간:', new Date().toISOString());
  console.log('\nBEGIN;\n');

  let pavlovIndex = 1;
  const pavlovIds: string[] = [];

  // 각 stimulus를 Pavlov로 생성
  for (const [stimulus, responses] of Object.entries(groupedData)) {
    const pavlovId = uuidv4();
    pavlovIds.push(pavlovId);
    const encryptedName = encrypt(stimulus);
    const escapedEncryptedName = escapeSqlString(encryptedName);

    console.log(`-- Pavlov ${pavlovIndex}: ${stimulus}`);
    console.log(
      `INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")`,
    );
    console.log(
      `VALUES ('${pavlovId}', '${userId}', '${escapedEncryptedName}', NOW(), NOW());`,
    );
    console.log('');

    // 각 response를 PavlovDetail로 생성
    responses.forEach((response, idx) => {
      const detailId = uuidv4();
      const encryptedDescription = encrypt(response);
      const escapedEncryptedDescription = escapeSqlString(encryptedDescription);

      console.log(
        `--   - ${response.substring(0, 50)}${
          response.length > 50 ? '...' : ''
        }`,
      );
      console.log(
        `INSERT INTO "pavlovDetail" (id, "pavlovId", description, "createdAt", "updatedAt")`,
      );
      console.log(
        `VALUES ('${detailId}', '${pavlovId}', '${escapedEncryptedDescription}', NOW(), NOW());`,
      );
      console.log('');
    });

    pavlovIndex++;
  }

  console.log('COMMIT;');
  console.log(
    '\n-- 완료! 총',
    Object.keys(groupedData).length,
    '개의 Pavlov와',
    PAVLOV_DATA.length,
    '개의 PavlovDetail 생성',
  );
}

generateSql();
