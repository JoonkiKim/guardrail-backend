

-- 파블로프 데이터 SQL INSERT 문 생성
-- 유저 ID: 5636f816-00b4-40e9-87c3-b39882cf4e57
-- 생성 시간: 2026-01-12T15:13:23.440Z

BEGIN;

-- Pavlov 1: 거의 모든 상황
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('3cf88077-0b0a-4802-9927-2b880dc3a383', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'XMcjRtN7jSdWxRR9zb3QkeV5EaNBE97pJwTbqZCWopZ/JjFV54ynyw24wa1x2wA8', NOW(), NOW());

--   - 10초 세며 숨 고르기
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('cff47fa0-b0fe-43b2-b480-cf833e5b10ea', '3cf88077-0b0a-4802-9927-2b880dc3a383', 'm7ndrxVW7N11D1XY5UcGBXoigLLRRATIQ86PUhVvIk4Lg6Qf1YntZpgN6ZuEL4ruhnWR3fmc', NOW(), NOW());

-- Pavlov 2: 갈등
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('60afb42f-dc19-4c6c-98df-89c81367defb', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'JQQkdLacQ/xZqTgubb8TS2X5VHpJErVSzvqP4C1BjrjyDA==', NOW(), NOW());

--   - "내가 맞다는 걸 증명해야 할 필요가 정말 있는가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('27ca8cba-c0e3-4bb7-a5c2-2fd2121e8d83', '60afb42f-dc19-4c6c-98df-89c81367defb', '/apLwtuekpx1JYBEijG2Wli60RmxGdPohVteQQBdx5nhg+/xtGikcPsvdHzuAu10xqEtb4Hfb2dbVyg6UEpQDIfdUd+rGjWoy7lSY4YkG+j1wovLN0IbQhmlt0ueIoI=', NOW(), NOW());

--   - "상대방의 사정, 상대방의 의견을 궁금해 하고 있는가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('98bcd2f7-2f99-42ef-b4bc-04b5657e7fb6', '60afb42f-dc19-4c6c-98df-89c81367defb', 'HpVMSd/WafF5oH97NIt42fkIqV4mBclx33fXWaO7AXEyJaa9TiVCz5EQYmtIiEg2glD3kerMQKUSxb8oh5WTsaizZPK30XoWfQUpCRHAkPp9EveIZhRnFWMieWikMTe5EsSoBzI=', NOW(), NOW());

--   - "이겨야 할 대상은 없다. 이해해야 할 사람만 있을 뿐이다."
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('23f36bfc-5c6b-4591-a986-4e1299d75991', '60afb42f-dc19-4c6c-98df-89c81367defb', 'Sc/Upk9YO3WY7rPIQ4j6RogN+X7rlkPIBhrEbTNzf33eR7ZUjjgfoyl/X5tGnxjgYFEUosavPkcVeFf9Ve92ie+jE4RSUlQsaySAkT9aWMm/NmclZy33XiAx1vKAMElH0RKNroNeWGUgSQ==', NOW(), NOW());

-- Pavlov 3: 감정적 동요
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('05519f29-278b-4cad-8024-b5358cdbbcec', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'Rg6B3t4sAQobI1ssiyup1f+KAmqV+W3GeVsHzpl/N5ab6SRnRFdeZ7eLPk0=', NOW(), NOW());

--   - "이건 무슨 감정인가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('2ffe1564-2642-4e15-a92f-bbe19eb71ba1', '05519f29-278b-4cad-8024-b5358cdbbcec', 'Xy84ydbwglQsCb/ZFZTn3K+5gPKZE1Ems/0ZlwgLgEyvTBTbrTiYLONKz05bicXglNllgF4Pk1Ov', NOW(), NOW());

--   - "내가 지금 배고프거나 피곤한가? 아님 진짜 감정인가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('24087d16-7224-47c9-97c1-7f4023531737', '05519f29-278b-4cad-8024-b5358cdbbcec', 'TH/VQoeXBqVKlf/c/wKzVAxACHTF/ee+QsQAPHoIJM+Q9SjHcrQ3v4p4t6FNkIUOJzYJhKTonuUUb3hDB8Wz12IJX9Ldzay7hvqhlyv1ktWUct1E0Xxl6CothIiOwlqgzMyEAo4=', NOW(), NOW());

--   - "10년 뒤에도 중요한 일인가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('3664a175-2965-4692-b0db-1260c1613b49', '05519f29-278b-4cad-8024-b5358cdbbcec', 'p/gTw911X9VtYErCTY549UKLJYtVIL7idSxpwevX5VcAXJObV2/VUsip9wUra8o3OCsmbvEsGZjutxVy/2qpU9Xb', NOW(), NOW());

--   - "이 순간은 전체 우주에서 얼마나 미세한가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('cca94c72-f5a6-47cf-987f-3099b016df5f', '05519f29-278b-4cad-8024-b5358cdbbcec', 'usSJlil9qFIFh/uEujO2fkoZp+Bzu2qCz9jhkiqukrXyKV8BgRwpis+2lTtwYFJq9A6mVg9vEu6VddUA78gM6gDUbvrCNUrNwBFrV+f+v9YdcfqONz0S', NOW(), NOW());

--   - 자리에서 일어나 자극 없이 5분 걷기
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('fdc7dfbc-35af-403c-9e92-68ba55280c6a', '05519f29-278b-4cad-8024-b5358cdbbcec', '2QCw68PJBg/TgV6c3YenvezzNDhli6tHyxlOc9PcubN0aFuTXpAOn/1uA/KWZf/RhJI4LX1xGOiD2C5TKpYJJPEs5Uq5XzW2zGHf1Q==', NOW(), NOW());

--   - 목 뒤에 찬물 묻히기
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('f179674d-cea4-4255-bfd2-2f7cc9887397', '05519f29-278b-4cad-8024-b5358cdbbcec', 'kMCBw60UQpch7PxrRi3XFN6vPHAyz1EPXTAGgcj3emPZJKZ46gqZ0PQ+5GuTRm4RsU9MTY0YYA==', NOW(), NOW());

--   - "지금 해결하지 않아도 괜찮은가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('66ebe5ef-0eed-4bce-99c0-dff9dd056576', '05519f29-278b-4cad-8024-b5358cdbbcec', 'BIAtPJZ5G/q7pYw3GuZO2/4xzL5xspuVgmrn/2aZqoQ4J6E2+sf0hej+6veTEhIgaRdj9Zk36YB3xH8XC1a0AyAffiN/lqy1Bw==', NOW(), NOW());

-- Pavlov 4: 계획이 틀어졌을 때
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('a8dc6c54-6cf5-486f-87b7-9a96e830c25f', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'tFnoREIeJdYbpxUXqvKfE3GEdPXdYj97e7tB11BVxBfkov27gU9fTcDTgB4Sc1+s7ofQyRk5', NOW(), NOW());

--   - "전체 그림에서 정말 중요한 부분인가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('a5c06f40-ce8c-4e77-9494-59c2d14d39dd', 'a8dc6c54-6cf5-486f-87b7-9a96e830c25f', 'OLPeK6LOjzk+cQJWX0bAiCzpv7y7BBsVDWOaiGt4+sn0IYUaQvWfe9zEA/s7yCfVHVhwRD8aDrhGtLnTzW6zTCGpInfUIOWFFHVqCqgCKO0=', NOW(), NOW());

--   - "지금 이 상황에서 통제 가능한 건 뭔가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('a1b1f846-e10d-49f5-9931-c4baf84c63c8', 'a8dc6c54-6cf5-486f-87b7-9a96e830c25f', 'iCJj6WfxN/euuz5L/k7xejCVtnG662a0eP2VeuSexPDqwKWLT0dA0qjTXfDDQKATOtMxH6VDgsPZYRq9m4khY6OmmiaA9OlZFeRPm/qCI2Q4Bg==', NOW(), NOW());

-- Pavlov 5: 데드타임
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('df577da2-853d-4e61-a34a-0d8da1efa694', '5636f816-00b4-40e9-87c3-b39882cf4e57', '/CDZrptGFbVapqyphsMYgVaAhOywapToRrIVbIEAb7gFSr2G11PVNg==', NOW(), NOW());

--   - 언어 전환 (예: 외국어 문장 1개 암기)
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('55226568-7252-48b0-b26c-4737af9d0268', 'df577da2-853d-4e61-a34a-0d8da1efa694', 'VFk3I8uOgNDLSdXBYCzdut83TdRj48PtIFO4t2N/bkU5WqC311MNgsLhLp7q7Uw3iuRy9SjTPifFket2LziCyo0e+IXrjIkaZSXc9Vg=', NOW(), NOW());

--   - 짧은 신체 루틴 (월싯 1분)
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('f64d47d5-5194-4734-85f9-32f1a0a5be06', 'df577da2-853d-4e61-a34a-0d8da1efa694', '99oj964B4G8Br0PpVyQ37UO/aKmNuE0U7AH9xaU/BOt0rJqp4U4vd1+tZFoWNE4PTfqUpLv4ulNZLrspHAM=', NOW(), NOW());

-- Pavlov 6: 좋은 의사결정
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('446a30ef-c636-4920-b1f1-e08c17466e83', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'DLOus5iBTc5h2sodvtuQ2ThFuwZO+/zwnBDLT7AXqBlEdWQzJ8cQIEClRKltIzM=', NOW(), NOW());

--   - "꼭 지금해야 하는가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('a9df9c80-fd4c-489d-bbb6-1dd7fe7d98c1', '446a30ef-c636-4920-b1f1-e08c17466e83', 'PbaTT/LWdaMlMWqvl9aTRiJryDnYG2A3+TWG9Uq1SGyNIZWQ6mb2IGPKDmt+cBHT/08oIprZfL1G', NOW(), NOW());

--   - "감정인가 판단인가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('3bb3d4b9-0627-4049-b9a4-3a5280b6bf75', '446a30ef-c636-4920-b1f1-e08c17466e83', 'wadvvxUQgnNBGPrN55Nl5gFlPJGpRjZwURAfINr31GEojTvLA6i3W+lZcz82cslwvFDq46ZA48Q=', NOW(), NOW());

--   - "핵심 기준은 뭔가? 그걸 만족하는 선택은?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('4a66c5ab-73ae-4a55-982e-94708d857503', '446a30ef-c636-4920-b1f1-e08c17466e83', 'jT6HGcXmS0qIOuKquYKueuu4KIU+AWNOfoLQc+gpYpwrtjUGZ8StoaCQIqsVsTr3k/0i/36uX543yApQErD2vGfuGW5DbzPqkTcRJte0Yz2si1NzWg==', NOW(), NOW());

--   - "내가 죽기 직전에 이 선택을 어떻게 평가할까?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('13c7a7af-7edf-4d1e-ae6c-69c98d8d8c8d', '446a30ef-c636-4920-b1f1-e08c17466e83', 'JZtm8frF/cBhQlFCbVm1g609uelMRV5kcf5LmtKJT7mttZzK8C+Yggg+foZ7XGEyfB/uxoseH50zy7dbVYYdVoWPLe9r5iPvlBoMSd4BpWftonuDJY1z71qNvg==', NOW(), NOW());

--   - "10년 후 모든 걸 이룬 미래의 나라면 이 일에 어떻게 접근할까?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('54cbce40-368f-4d35-bfd6-36eb58e55072', '446a30ef-c636-4920-b1f1-e08c17466e83', 'pRM6aFUUEQzpBtb+Ky8ChApE3Nx7QK17ReR9nkZm7CwHBlKu+67evvuV1gxu2ITPzrAlZkl7EQ0MhJkb/Qa93BiD5aVkCL+pcFtpWZqk26x7sjbapB6pRZkc86xo+HUBO7Zcb/rf3V5VcTn2SKA29A==', NOW(), NOW());

--   - "이 결정이 10년 후 내 삶에 어떤 의미가 있을까?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('4458fd1d-2be1-4c4d-8a74-681834d3cc38', '446a30ef-c636-4920-b1f1-e08c17466e83', 'uSq0CZSImtFzN3BPZHRo1x/mHHRdad//EL3bNJtbNdrqz4+3fvMVG5t18XRUZy+VA4zPj0YKJ5zLmiyAmiqhB+baWrPkKyvca2nSre3PoeO2RhMO6weVzcIdXV8=', NOW(), NOW());

-- Pavlov 7: 의사결정으로 인한 스트레스
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('70a378f8-7b43-4378-acc3-1ea4e2ced0e3', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'yb/9GWg71WzHvidSru0GxtZBKcSKzzn41uMoVpsqjy1NukcIom880Ti6Qyr5uvIDgYBXqmZe4bz3aBJCOOrZlBcf', NOW(), NOW());

--   - "위임할 수 있는가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('c8fce8e9-62c6-4c30-b9ac-40e035dc52b4', '70a378f8-7b43-4378-acc3-1ea4e2ced0e3', 'z111JUtiNPaymzWVrlPCaWFn52jSha93m7ZLolsKab+GsfO0OvfO6hBS4yL5s0c35TACd6Bc', NOW(), NOW());

--   - "가역적인가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('b30eb07a-4642-4ef2-b133-9220fb0508db', '70a378f8-7b43-4378-acc3-1ea4e2ced0e3', 'a3bbe285gboPHzg9Jq84hvowBEIos6b0wGGJMriFkBd9qO8FYZ1B2chtwA3uUg==', NOW(), NOW());

--   - "(완벽하지 않더라도) 충분히 좋은가? 좋다면 그렇게 하자."
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('808af9a2-820a-4ea1-b524-cc2ab45e794a', '70a378f8-7b43-4378-acc3-1ea4e2ced0e3', 'OO5tkuKGu6J5HGzr1ZdGk6RZsCCpf5ywN1RcMkCTEzHWApdZwqkk0uIoRP+VpIkH4rKdqpiqkFSbsjVScXWxxmIjvQc8mBbGtdE1UAGc1qN4q4C83aWg2/DuIqtjEcXLgW4kxSmS5NLoXg==', NOW(), NOW());

--   - "최악의 경우엔 어떻게 되나? 난 그걸 감당할 수 있나?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('5ca1127a-0876-4cb4-ad9c-6442dd608f40', '70a378f8-7b43-4378-acc3-1ea4e2ced0e3', 'bpDx7FGy1rXrHipS2dVrnZr2tpsle8Tdq/3YgU+reeSWFHCYKMfl7UdMsSxCNkwZr5C2xX+M+x/U8JujdzKAr+/JRyMtOkV9lqxiDcbwaWCfnMeCuMAl7Cr4ZO732+ynJhLVXw==', NOW(), NOW());

-- Pavlov 8: 문제 해결
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('ec9b2ce6-377b-4d59-ba2d-67d6d288772c', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'bYNxZ9QX3O4wSrc5XSoS3yKO88lby6E6ryH1znz+rvKOMTh1HNjCv5Q=', NOW(), NOW());

--   - "이 문제를 해결하는 완전히 다른 방식은 없을까?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('d2ab270c-240a-453b-b0e4-eb508c0692ae', 'ec9b2ce6-377b-4d59-ba2d-67d6d288772c', '+26al0FWem58ucvLI4ypvFg8NDQsz9CGpn+jT9cPDFNJ0IyMHXQ/KeioSJtXuKuT60muVgiLv0eTEZ/KLvOztL3GV2ZY4IfKyGpcOJoH5xCCzHtkDhjRI09Td0TMJg==', NOW(), NOW());

--   - "처음부터 다시 시작한다면, 진짜 문제가 무엇이었나?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('a70a2d1f-0cfe-4495-a6c0-cd22407816f6', 'ec9b2ce6-377b-4d59-ba2d-67d6d288772c', 'DIci5+5kdCl3Ylpb3tqT3Jw9s2lUH/F+YokcsWNgGsHNpWSQE1SsgFAGYLQW7n2nlvdyZiM+AeX0pz6XEUA2LyEUYlso8NT7BBaDTwCgHhuYe4kmZZVU317zZuSpX/Naze/wgw==', NOW(), NOW());

-- Pavlov 9: 소비 충동
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('e864e62a-9563-4c25-b187-b6bf16755d70', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'dwDAesDmUju7MSeeeObECDVtmV4MzDwkkGvlym1zWzJ6mhNljfjqyHg=', NOW(), NOW());

--   - "좋다. 근데 필요하진 않다."
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('6642ac7c-43d6-46d3-8ba8-96a81ad4d035', 'e864e62a-9563-4c25-b187-b6bf16755d70', 'tQprI1Qb0H+bSURtZQCCyrQYurPreGWMuP5MEjCPYvBBZZKuF43NkeJad1rndKjiwKgAn9nkXh5UAPlIleboCX4=', NOW(), NOW());

--   - "일시불이래도 살 것인가? (10만 원 이하는 무조건 일시불)"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('a5aa1cb9-9a1a-4712-9b8c-2a9720181c06', 'e864e62a-9563-4c25-b187-b6bf16755d70', 'Pit/AWNH5u43rv8B3oiCRHWNf+ZxBCqxXc/o5kuihciyRCCclueBygYBjus+0EqSdyMCIZOtYv4RGdul/6T3EAGKlw5bB/3LjeWKhPaf9G9lE3hA0adRukdKTwjq8Ebl/2y+pAX4vgzk', NOW(), NOW());

--   - "가격을 떠나, 이걸 구매하는 데에 나의 시간, 집중력, 의사결정에 따른 정신적 피로를 투...
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('062b1335-c26a-4ac2-b0ad-736e819cc08b', 'e864e62a-9563-4c25-b187-b6bf16755d70', 'fR2uOfxotgilwx4WYYk/bCFj3CdH+0EtM4QVmJW5NACD3Hr+FZWWAC8jNGDTewy8BKiRVukfyUV1Q1/bZtlq64Z5Me6/ImPXU0dmIXiv+UGfWPFnfUtoddUDy/nNhSFN2GWi6rtP/IWSr/WHyW56IDozeK53VH2N49BraR8JYBQQL+gSXbz689/H0hRYDEVb7b7LDJ7xqjgwwpclo9i0T4RA6uZTrob+6+LZSwnc', NOW(), NOW());

--   - 그래도 사고 싶으면 소비 리스트에 기록
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('c6c5cb1c-1a8a-4e8d-b417-50393afd6ec3', 'e864e62a-9563-4c25-b187-b6bf16755d70', 'XH4th+XRpYvnKndkE8GiS4zvXpNgcJB+6r3FzB28BR6dFuC0F9KbbzDkmYMtPeo8YOlDZB78v5YT738YpthO+RcAgYSWpIlosZuXHENy+JjH', NOW(), NOW());

-- Pavlov 10: 콘텐츠 소비
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('d6aa9e39-7e4d-46c6-8664-4db31dffd8e6', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'm5Erb+LjUEdkNzKCJ3XMrG92iTRJ21Yx1t5m2zJoLyVXEmUmWIjBqtY96vo=', NOW(), NOW());

--   - "여기에 시간 쓰는 게 정말 가치 있나?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('ee93628a-6d52-4935-9a55-1a32080a118e', 'd6aa9e39-7e4d-46c6-8664-4db31dffd8e6', 'JBKluUy7N2voM/dMYSyAOHDXfGeSCwfPe8u/g0biaLkLDooMkvSVs/Nub5D2XMqtmHhiHdtLnWFdr4Y0hLBJaQkSltSvjzwtSnRTfqBgkQ==', NOW(), NOW());

--   - "난 지금 이걸 정말로 궁금해하나, 원하나?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('18833709-61db-4a0b-8ba0-02ae2baa5d87', 'd6aa9e39-7e4d-46c6-8664-4db31dffd8e6', 'rWnQT4RetlC0wEpy0etKxs6H24JkjWbM/vuQD0g66G80YXmgGZ/sdPrL+vlU5egdxllJnS91XMSqwgj1HjUkp8dnWh2V1KcbzCT1IWVG7x4ZfMeJFw==', NOW(), NOW());

-- Pavlov 11: 의사소통
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('92f87a50-bb98-483a-9b46-904fc1ba1e99', '5636f816-00b4-40e9-87c3-b39882cf4e57', '0b/mfk3BSIhqdm86+1T4yqFcRN7Sh40rcIL1y/RRDpUBDBYJgZHR+Q==', NOW(), NOW());

--   - 이름 기억하고 시작
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('098442be-1c47-499d-86e9-fac5065ea496', '92f87a50-bb98-483a-9b46-904fc1ba1e99', 'S1hZhDTU8S0Ac8tjfLH/cyavGo1FxiUMIsllanoD3romlIggEwbTQ8VvkTh4HD2suOyUJw/Y', NOW(), NOW());

--   - "듣기 비율이 얼마나 되는가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('8ee0b513-ae28-4cc8-8c3d-bc8b098e7705', '92f87a50-bb98-483a-9b46-904fc1ba1e99', 'ng0wF2J/lOhOXj6wGyQ81qN++4ur5ez/5RnVUZG49YsaV9Vs7e3tyi+AQ3AFv453HqQGRTEJHORjg0yaYLMGjuA7mA==', NOW(), NOW());

--   - "상대방의 얘기하고 싶어하는 것은 무엇인가?"
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('46e10898-de5c-4178-8aee-406dc0e19cec', '92f87a50-bb98-483a-9b46-904fc1ba1e99', 'sWIb00tQ/jvr/Uv7gvhAnC2VduunUE9Wze7IYHKcTBUiQvVtX1reiMGYWCvWyMijWeRiagC8JIurgKyezR8xJhhi59LnNY0Wfhp6m3+XwqXQfoAnRv+1WlM=', NOW(), NOW());

--   - "상대의 감정을 얻었는가? 이성보다 감정이 먼저다."
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('33153a79-2915-4f64-81af-02378cec78d0', '92f87a50-bb98-483a-9b46-904fc1ba1e99', 'wRLt5qx8Y3KmX6Eu5dEUgoXQvtFXMxLOVqGaLIfSGVST8rE/py3sJOGfRhip8IAwWiZ3lwrPUGlEUW907pjE+7BAOc1L00tZf4p2+KpmehEL0rqnc4MzZWmxsvu6oTMf/w==', NOW(), NOW());

-- Pavlov 12: 다맥락에 압도될 때
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('995da39d-fc5f-49ba-8a81-21c6a66d94bd', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'k+F4jYEvo5x92C2YdILNwKSckZOXHRjXhazU3iT4UKR+vx75+1SvysXxNDuNwFYhjIQwMnmn', NOW(), NOW());

--   - 모든 맥락을 두서없이 적고 가장 빨리 끝낼 수 있는 하나 먼저 처리
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('f7377e65-be92-4951-a30d-12621136a876', '995da39d-fc5f-49ba-8a81-21c6a66d94bd', 'PqJx9akmYg/APc3T/ZTLBFjjBvk2U09QTyL+J9YriXhsEffSTEjL5c3XXNT5BqsFKKlfDdYr71C3v1bKwZDEIDs97+maBi8926XMnFmIhkYw7Fc42XnYWRPcmvxIx+fZ0G0Rn5xIctsonnVdV5+9OLYN7p+G', NOW(), NOW());

-- Pavlov 13: 시간 허투루 보낼 때
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('173d2145-8d83-4d95-8ec6-a93f481b6aac', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'T1bz5E+doTtZMSaNwDlvNoJR7JULuaMbURuGCgvTOwmzpZbh9qQcebfbplobPEBl9191fBqZ+A==', NOW(), NOW());

--   - "10분은 깨어있는 시간의 1%다."
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('658bc993-1252-4e12-b576-ed0d60ed89d2', '173d2145-8d83-4d95-8ec6-a93f481b6aac', 'pLnKx4Y1fOG6gtGkvUY2crKKs9Zt4EvV4tYfF9TcpcVvl2jeY5gRx8P3VI9PMkH3QZVWkZT9UjN0Cu7zKHYmFGef3gs=', NOW(), NOW());

-- Pavlov 14: 일 시작이 안 될 때
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('d257110f-6e2c-4b3a-bc19-6fa3752b7ec6', '5636f816-00b4-40e9-87c3-b39882cf4e57', '5StbRAjXK5YPhWhUcg/qHW/BN3gPt2TyB51shcVKCOzHgBCSMy8+uMStcY7oaQsrTk+43F8=', NOW(), NOW());

--   - 3분으로 쪼개서 바로 한다
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('bd29e68f-0246-4363-9dc0-9f5f3b899308', 'd257110f-6e2c-4b3a-bc19-6fa3752b7ec6', 'udENiXmG8tSI7Q0IzW/GIBVOuOITu95NG/OidiZ9eFicIjyIR9yb24VFjegT1SU7ADVm+wg8ed5AaRiWFc4=', NOW(), NOW());

-- Pavlov 15: 일이 열렸을 때
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('f3ab263d-c10d-4624-994e-619c208d07f0', '5636f816-00b4-40e9-87c3-b39882cf4e57', '62b5Fj0gc+eHLaVPcoIhDRdx7h7+AS/ZiMaVbgpj47FkxKy/O+6s4hFK2iwa7kvu', NOW(), NOW());

--   - 바로 메모
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('7df728b6-b119-497e-82cb-698ebc9e7dc0', 'f3ab263d-c10d-4624-994e-619c208d07f0', 'yeJkckAsnFM+2uRIffoUIqGKuqfjREcVacyxohXl1Ig3SKwR7i6GVNQ=', NOW(), NOW());

-- Pavlov 16: 자기 전
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('88bd4708-494d-4d3b-8061-8ac4e5ed35a9', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'z7E3q9jHXCwaMwnZlRuC974lxeUcR5UgEGbKmuq/XrSOMm2Qdfw=', NOW(), NOW());

--   - 오늘 하루 중 후회되는 (스스로에게 떳떳하지 못한) 행동이 있었나?
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('17bc7dc9-cec6-46b6-bfb3-d1a9ff06c596', '88bd4708-494d-4d3b-8061-8ac4e5ed35a9', 'yUFown2qP13rpmiQ5cfn7J7JRs7qjWVq0kElDjXuWSCLJvTgpbCcB3JiHUaLU02sA6/4htM8ebAlHg5HP05syUEg+5DZDQFtPAWgStuIh9HDi7wf8h4f89v/e12eJd9LRj2T9sNhPYbn35xc/1uc8YHnf1Ur', NOW(), NOW());

-- Pavlov 17: 회의감
INSERT INTO "pavlov" (id, "userId", name, "createdAt", "updatedAt")
VALUES ('4486f779-932f-4059-b248-72bdcbf79a74', '5636f816-00b4-40e9-87c3-b39882cf4e57', 'bcFSPUqtowcZ/q20+yOKm94ClYfIDArRpYdtBbXgjfvebwoG8w==', NOW(), NOW());

--   - 지금 이 회의는 문제 해결을 위한 건가, 자기소모인가?
INSERT INTO "pavlov_detail" (id, "pavlovId", description, "createdAt", "updatedAt")
VALUES ('8b455594-4b0c-4871-b4f5-6af7b3550aae', '4486f779-932f-4059-b248-72bdcbf79a74', 'PVJ91xkvg4CjDYiCNv3qn60mwZLx9RjhkiAbxCjeaZFee8um0zVCJynfeTtPQBjX2D9fClXDoXqS6wcgv5J0rAImE02ean6lVyH6XHupMedBImnth39DmalFHvS/kT+GAQTt1Q==', NOW(), NOW());

COMMIT;

-- 완료! 총 17 개의 Pavlov와 43 개의 PavlovDetail 생성
