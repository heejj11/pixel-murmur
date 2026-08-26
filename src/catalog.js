const imageRoot = '/images/objects'

const toastPowerBank = {
  id: 'PM-001',
  name: 'Toast Power Bank',
  nameKo: '토스트 보조배터리',
  status: 'Just a Pixel',
  reality: 0,
  image: '/objects/pm-001-bread-power-bank.webp',
  accent: '#824817',
  href: '/objects/pm-001',
  alt: '토스트가 꽂힌 크림색 토스터 형태의 무선 보조배터리 콘셉트 렌더',
  category: 'Object',
  intro: 'A familiar breakfast silhouette reimagined as a quiet charging object. The toast-shaped battery and its base turn power into a small daily ritual.',
  introKo: '식빵과 토스터의 익숙한 동작을 충전 경험으로 바꾼 보조배터리 콘셉트입니다.',
  statement: ['A small ritual,', 'recharged.'],
  story: [
    'Most batteries disappear into bags and drawers. Toast Power Bank is meant to remain visible: a collectible desk object with a useful second life.',
    'Returning the toast to its base completes the silhouette and begins charging. Until that mechanism is engineered, the idea remains in pixels.',
  ],
  notes: [
    ['Interaction', 'The toast-shaped battery returns to its base, turning charging into a small, familiar gesture.'],
    ['Material direction', 'A warm matte shell, tactile tan control, and dark inset display keep the object charming but grown-up.'],
    ['Intended place', 'Designed to stay visible on a desk, bedside table, or shelf instead of disappearing into a drawer.'],
    ['Archive note', 'This is an illustrative design study. No manufactured or production-ready version exists yet.'],
  ],
  gallery: [
    {
      role: 'hero-front',
      src: '/objects/pm-001-bread-power-bank.webp',
      alt: '토스트가 꽂힌 크림색 토스터 형태의 무선 보조배터리 콘셉트 렌더',
      label: 'Studio view',
    },
  ],
}

const toastTshirt = {
  id: 'PM-002',
  name: 'Toast T-Shirt',
  nameKo: '토스트 티셔츠',
  status: 'Just a Pixel',
  reality: 0,
  image: `${imageRoot}/pm-002-toast-tshirt/01-hero-front.webp`,
  accent: '#9a541d',
  href: '/objects/pm-002',
  alt: '버터 장식과 구운 식빵 가장자리 표현이 들어간 크림색 오버사이즈 티셔츠 정면 렌더',
  category: 'Wearable',
  variant: 'Butter',
  intro: 'A soft oversized T-shirt that borrows its color, texture, and toasted edge from a slice of bread.',
  introKo: '식빵의 결, 구운 가장자리, 녹아내리는 버터를 한 벌의 티셔츠로 옮긴 의상 콘셉트입니다.',
  statement: ['Choose your', 'toast level.'],
  story: [
    'Toast T-Shirt treats an everyday white tee like a slice waiting to be browned. The warm edge gradient gives the flat silhouette a playful, edible depth.',
    'The Butter version adds one small three-dimensional accent. Fabric, print method, and washable construction still need to be tested before the idea can leave the screen.',
  ],
  notes: [
    ['Silhouette', 'A relaxed unisex fit with dropped shoulders keeps the toast-shaped body simple and wearable.'],
    ['Surface', 'A pale bread-crumb texture sits across the fabric with a darker toasted gradient at every edge.'],
    ['Butter detail', 'The yellow chest accent is imagined as a soft raised applique with a printed melt trail.'],
    ['Next test', 'Fabric hand feel, edge-print consistency, and wash durability need physical sampling.'],
  ],
  gallery: [
    ['hero-front', '01-hero-front.webp', '버터 장식과 구운 식빵 가장자리 표현이 들어간 크림색 오버사이즈 티셔츠 정면 렌더', 'Front / Butter'],
    ['back', '02-back.webp', '식빵 테두리처럼 갈색 그러데이션이 들어간 토스트 티셔츠 뒷면 렌더', 'Back'],
    ['side-profile', '03-side-profile.webp', '토스트 티셔츠의 드롭 숄더와 옆선을 보여주는 측면 렌더', 'Side profile'],
    ['collar-fabric-detail', '03-detail-collar-fabric.webp', '갈색 골지 카라와 식빵 결 원단 표현을 확대한 티셔츠 디테일 렌더', 'Collar and fabric'],
    ['butter-detail', '04-detail-butter.webp', '토스트 티셔츠에 부착된 노란 버터 장식과 흐르는 형태를 확대한 렌더', 'Butter applique'],
    ['worn-lifestyle', '05-worn-lifestyle.webp', '따뜻한 주방에서 토스트 티셔츠를 착용한 모습을 보여주는 라이프스타일 렌더', 'Worn view'],
    ['packaging', '06-packaging.webp', '식빵 모양으로 접은 토스트 티셔츠를 투명 봉투에 담은 패키지 콘셉트 렌더', 'Packaging concept'],
  ].map(([role, file, alt, label]) => ({
    role,
    src: `${imageRoot}/pm-002-toast-tshirt/${file}`,
    alt,
    label,
  })),
}

const toastEcoBag = {
  id: 'PM-003',
  name: 'Toast Eco Bag',
  nameKo: '토스트 에코백',
  status: 'Just a Pixel',
  reality: 0,
  image: `${imageRoot}/pm-003-toast-eco-bag/01-hero-front.webp`,
  accent: '#8c4e1e',
  href: '/objects/pm-003',
  alt: '식빵 모양의 크림색 캔버스 몸체와 긴 손잡이가 있는 토스트 에코백 정면 렌더',
  category: 'Carry Goods',
  intro: 'A practical canvas tote shaped like one generous slice of toast, complete with browned seams and a quiet stitched mark.',
  introKo: '도톰한 식빵 한 장의 실루엣과 구운 테두리를 캔버스 가방으로 옮긴 에코백 콘셉트입니다.',
  statement: ['Carry a slice', 'every day.'],
  story: [
    'Toast Eco Bag turns the square utility of a tote into a soft bread silhouette without losing everyday capacity. The visual joke stays readable from a distance.',
    'A structured canvas body, reinforced handles, magnetic closure, and interior pocket make the concept plausible. Pattern balance and seam construction remain to be sampled.',
  ],
  notes: [
    ['Shape', 'Rounded upper corners and a gently browned perimeter create the slice silhouette without a hard novelty outline.'],
    ['Material direction', 'Heavy cotton canvas gives the body enough structure while keeping the surface soft and familiar.'],
    ['Inside', 'A magnetic closure and small hanging pocket organize daily items without changing the clean exterior.'],
    ['Next test', 'A paper pattern and weight test will decide whether the bag holds its toast shape when carried.'],
  ],
  gallery: [
    ['hero-front', '01-hero-front.webp', '식빵 모양의 크림색 캔버스 몸체와 긴 손잡이가 있는 토스트 에코백 정면 렌더', 'Front'],
    ['back', '02-back.webp', '구운 식빵 테두리 표현과 손잡이 보강 박음질을 보여주는 토스트 에코백 후면 렌더', 'Back'],
    ['side-profile', '03-side-profile.webp', '에코백의 옆폭과 입구, 두 개의 긴 손잡이를 보여주는 측면 렌더', 'Side profile'],
    ['crust-logo-detail', '04-detail-crust-logo.webp', '캔버스 원단과 갈색 테두리 봉제, TOAST 인쇄를 확대한 에코백 디테일 렌더', 'Crust and logo'],
    ['interior-pocket-detail', '05-detail-interior-pocket.webp', '자석 여밈과 내부 포켓, 손잡이 보강 박음질을 보여주는 에코백 내부 렌더', 'Interior pocket'],
    ['worn-lifestyle', '06-worn-lifestyle.webp', '밝은 상의를 입은 사람이 토스트 에코백을 어깨에 멘 라이프스타일 렌더', 'Carried view'],
    ['packaging', '07-packaging.webp', '접은 토스트 에코백을 투명 포장과 식빵 아이콘 띠지로 감싼 패키지 렌더', 'Packaging concept'],
  ].map(([role, file, alt, label]) => ({
    role,
    src: `${imageRoot}/pm-003-toast-eco-bag/${file}`,
    alt,
    label,
  })),
}

const toastPhoneCase = {
  id: 'PM-004',
  name: 'Toast Phone Case',
  nameKo: '토스트 폰케이스',
  status: 'Just a Pixel',
  reality: 0,
  image: `${imageRoot}/pm-004-toast-phone-case/01-hero-three-quarter.webp`,
  accent: '#934f1c',
  href: '/objects/pm-004',
  alt: '식빵 속살 질감과 구운 갈색 테두리를 입체적으로 구현한 토스트 폰케이스의 사선 후면 렌더',
  category: 'Accessory',
  intro: 'A protective phone case that turns one familiar rectangle into a slice of toast, down to the crumb, crust, and molded edge.',
  introKo: '식빵의 폭신한 속살과 바삭하게 구운 테두리를 정교한 보호 구조로 옮긴 폰케이스 콘셉트입니다.',
  statement: ['A familiar shape,', 'freshly toasted.'],
  story: [
    'A phone and a slice of bread begin with almost the same rectangle. Toast Phone Case makes that resemblance tactile through a soft crumb surface and a browned protective rim.',
    'The humor only works if the object still feels precise. Camera protection, button response, port access, grip, and wireless charging all remain part of the physical test.',
  ],
  notes: [
    ['Crust edge', 'A raised caramel rim frames the soft bread texture while protecting the screen and camera from direct contact.'],
    ['Surface', 'The porous crumb pattern is imagined as a shallow molded texture that stays tactile without trapping dust.'],
    ['Precise fit', 'Button covers, speaker holes, and the charging opening follow the phone closely so the novelty never interrupts use.'],
    ['Next test', 'A first TPU and rigid-shell sample should verify grip, wireless charging, heat, and everyday pocket wear.'],
  ],
  gallery: [
    ['hero-three-quarter', '01-hero-three-quarter.webp', '토스트 폰케이스의 식빵 질감과 카메라 보호 테두리를 보여주는 사선 후면 렌더', 'Hero view'],
    ['back', '02-back.webp', '식빵 속살 질감과 구운 갈색 테두리를 정면에서 보여주는 토스트 폰케이스 후면 렌더', 'Back'],
    ['side-profile', '03-side-profile.webp', '토스트 폰케이스의 두께와 볼륨 버튼 마감을 보여주는 측면 렌더', 'Side profile'],
    ['camera-crust-detail', '04-detail-camera-crust.webp', '카메라 보호 립과 식빵 속살, 크러스트 전환을 확대한 토스트 폰케이스 디테일 렌더', 'Camera and crust'],
    ['buttons-ports-detail', '05-detail-buttons-ports.webp', '토스트 폰케이스의 충전 포트와 스피커 홀, 버튼 마감을 확대한 디테일 렌더', 'Buttons and ports'],
    ['worn-lifestyle', '06-lifestyle.webp', '체크 패브릭 위에 놓인 토스트 폰케이스의 아침 테이블 라이프스타일 렌더', 'Everyday setting'],
    ['packaging', '07-packaging.webp', '투명 식빵 봉투와 종이 트레이에 담긴 토스트 폰케이스 패키지 콘셉트 렌더', 'Packaging concept'],
  ].map(([role, file, alt, label]) => ({
    role,
    src: `${imageRoot}/pm-004-toast-phone-case/${file}`,
    alt,
    label,
  })),
}

const toastAirpodsCase = {
  id: 'PM-005',
  name: 'Toast AirPods Case',
  nameKo: '토스트 에어팟 케이스',
  status: 'Just a Pixel',
  reality: 0,
  image: `${imageRoot}/pm-005-toast-airpods-case/01-hero-closed.webp`,
  accent: '#8f4c1a',
  href: '/objects/pm-005',
  alt: '식빵의 속살과 구운 갈색 테두리를 입체적으로 표현한 토스트 에어팟 케이스의 닫힌 모습',
  category: 'Accessory',
  intro: 'A compact earbud case that turns every charge into a pocket-sized slice of toast, complete with crumb, crust, hinge, and carry ring.',
  introKo: '식빵의 속살과 구운 테두리를 충전 케이스의 뚜껑, 힌지, 키링 구조로 옮긴 에어팟 케이스 콘셉트입니다.',
  statement: ['A small slice,', 'ready to carry.'],
  story: [
    'Toast AirPods Case makes a familiar charging object easier to find and more enjoyable to carry. The toast lid opens with the case instead of becoming a separate decoration.',
    'The idea depends on precise engineering. Hinge clearance, wireless charging, speaker openings, grip, and the side ring all need to survive everyday pocket and bag use.',
  ],
  notes: [
    ['Lid and hinge', 'A fitted two-part shell follows the charging case lid so the toast silhouette opens in one natural movement.'],
    ['Surface', 'A shallow crumb texture and softly browned perimeter create the bread character without adding unnecessary bulk.'],
    ['Carry ring', 'A compact side loop gives the case a secure attachment point for a keyring, strap, or bag clip.'],
    ['Next test', 'A first flexible-shell sample should verify hinge clearance, charging access, wireless charging, and pocket wear.'],
  ],
  gallery: [
    ['hero-closed', '01-hero-closed.webp', '토스트 에어팟 케이스의 식빵 질감과 측면 키링을 보여주는 닫힌 사선 렌더', 'Hero view'],
    ['open', '02-open.webp', '흰색 무선 이어버드가 들어 있는 토스트 에어팟 케이스의 열린 모습', 'Open view'],
    ['back', '03-back-hinge.webp', '토스트 에어팟 케이스의 후면 힌지와 갈색 크러스트 테두리를 보여주는 렌더', 'Back and hinge'],
    ['hinge-keyring-detail', '04-detail-hinge-keyring.webp', '토스트 에어팟 케이스의 힌지와 금속 키링 연결부를 확대한 디테일 렌더', 'Hinge and keyring'],
    ['charging-detail', '05-detail-charging-port.webp', '토스트 에어팟 케이스 하단의 충전 단자와 스피커 구멍을 확대한 디테일 렌더', 'Charging access'],
    ['worn-lifestyle', '06-lifestyle.webp', '크림색 캔버스 가방에 토스트 에어팟 케이스를 키링으로 연결한 라이프스타일 렌더', 'Carried view'],
    ['packaging', '07-packaging.webp', '투명 식빵 봉투와 종이 트레이에 담긴 토스트 에어팟 케이스 패키지 콘셉트 렌더', 'Packaging concept'],
  ].map(([role, file, alt, label]) => ({
    role,
    src: `${imageRoot}/pm-005-toast-airpods-case/${file}`,
    alt,
    label,
  })),
}

const toastCardWallet = {
  id: 'PM-006',
  name: 'Toast Card Wallet',
  nameKo: '토스트 카드지갑',
  status: 'Just a Pixel',
  reality: 0,
  image: `${imageRoot}/pm-006-toast-card-wallet/01-hero-three-quarter.webp`,
  accent: '#8a4b1b',
  href: '/objects/pm-006',
  alt: '식빵 모양의 크림색 몸체와 갈색 테두리, 지퍼를 갖춘 토스트 카드지갑 사선 렌더',
  category: 'Carry Goods',
  intro: 'A compact zip-around wallet that carries cards and folded notes inside one neatly toasted slice.',
  introKo: '식빵의 폭신한 속살과 구운 테두리를 카드 수납, 지폐 공간, 지퍼 구조로 옮긴 카드지갑 콘셉트입니다.',
  statement: ['Keep a slice', 'close at hand.'],
  story: [
    'Toast Card Wallet turns a small everyday essential into an object that is easy to spot and satisfying to hold. The bread surface stays soft while the browned edge gives the shape structure.',
    'A full zipper, slim gusset, divided card sleeves, and a folded-note compartment make the concept practical. Thickness and edge wear still need a physical sample.',
  ],
  notes: [
    ['Shape and size', 'The rounded toast top creates a clear silhouette while the compact square body stays easy to carry.'],
    ['Zipper', 'A fine tan zipper follows the crust edge with a small leather pull that remains comfortable in a pocket.'],
    ['Inside', 'Card sleeves and one folded-note space separate daily essentials without turning the wallet into a bulky pouch.'],
    ['Next test', 'A stitched sample should verify zipper travel, card access, edge stiffness, and long-term surface wear.'],
  ],
  gallery: [
    ['hero-three-quarter', '01-hero-three-quarter.webp', '토스트 카드지갑의 식빵 질감과 지퍼 구조를 보여주는 사선 정면 렌더', 'Hero view'],
    ['front', '02-front.webp', '두 장의 카드가 살짝 보이는 토스트 카드지갑 정면 렌더', 'Front'],
    ['open', '03-open-interior.webp', '카드 수납칸과 접은 지폐 공간을 보여주는 열린 토스트 카드지갑 내부 렌더', 'Open interior'],
    ['side-profile', '04-side-profile.webp', '토스트 카드지갑의 얇은 옆폭과 지퍼, 가죽 손잡이를 보여주는 측면 렌더', 'Side profile'],
    ['crust-zipper-detail', '05-detail-crust-zipper.webp', '식빵 속살 질감과 갈색 봉제 테두리, 지퍼를 확대한 카드지갑 디테일 렌더', 'Crust and zipper'],
    ['worn-lifestyle', '06-lifestyle.webp', '크림색 캔버스 가방 안쪽 포켓에서 토스트 카드지갑을 꺼내는 라이프스타일 렌더', 'Everyday carry'],
    ['packaging', '07-packaging.webp', '투명 식빵 봉투와 종이 트레이에 담긴 토스트 카드지갑 패키지 콘셉트 렌더', 'Packaging concept'],
  ].map(([role, file, alt, label]) => ({
    role,
    src: `${imageRoot}/pm-006-toast-card-wallet/${file}`,
    alt,
    label,
  })),
}

const toastPouch = {
  id: 'PM-007',
  name: 'Toast Pouch',
  nameKo: '토스트 파우치',
  status: 'Just a Pixel',
  reality: 0,
  image: `${imageRoot}/pm-007-toast-pouch/01-hero-three-quarter.webp`,
  accent: '#8b4a1b',
  href: '/objects/pm-007',
  alt: '식빵 모양의 부드러운 크림색 몸체와 갈색 테두리, 상단 지퍼를 갖춘 토스트 파우치 사선 렌더',
  category: 'Carry Goods',
  intro: 'A soft everyday pouch that turns one roomy compartment into a padded slice of toast.',
  introKo: '식빵의 폭신한 속살과 구운 테두리를 넉넉한 수납, 상단 지퍼, 내부 포켓으로 옮긴 파우치 콘셉트입니다.',
  statement: ['Room for', 'the small things.'],
  story: [
    'Toast Pouch keeps cables, cosmetics, and stationery together inside a soft bread-shaped case. Its wider gusset and flexible body clearly separate it from the smaller card wallet.',
    'A broad opening, washable lining, divided interior pockets, and a side carry loop make the concept useful beyond the visual joke. Capacity and seam strength still need physical testing.',
  ],
  notes: [
    ['Roomy shape', 'A wider gusset and flexible padded body create useful volume without losing the toast silhouette.'],
    ['Top opening', 'The zipper opens broadly across the top so small items remain visible and easy to reach.'],
    ['Inside', 'A washable lining with divided pockets keeps cables, cosmetics, or stationery from mixing together.'],
    ['Next test', 'A sewn sample should verify capacity, zipper travel, lining cleanup, and the strength of the side loop.'],
  ],
  gallery: [
    ['hero-three-quarter', '01-hero-three-quarter.webp', '부드러운 식빵 질감과 넓은 옆폭, 상단 지퍼를 보여주는 토스트 파우치 사선 정면 렌더', 'Hero view'],
    ['front', '02-front.webp', '식빵 모양 실루엣과 갈색 봉제 테두리를 정면에서 보여주는 토스트 파우치 렌더', 'Front'],
    ['open', '03-open-interior.webp', '케이블과 펜, 작은 화장품을 나누어 담은 토스트 파우치의 열린 내부 렌더', 'Open interior'],
    ['side-profile', '04-side-profile.webp', '토스트 파우치의 넓은 옆폭과 상단 지퍼, 측면 고리를 보여주는 측면 렌더', 'Side profile'],
    ['material-zipper-detail', '05-detail-material-zipper.webp', '식빵 결을 닮은 원단과 갈색 파이핑, 지퍼, 봉제 마감을 확대한 파우치 디테일 렌더', 'Material and zipper'],
    ['worn-lifestyle', '06-lifestyle.webp', '밝은 책상에서 케이블을 토스트 파우치에 정리하는 라이프스타일 렌더', 'Everyday use'],
    ['packaging', '07-packaging.webp', '재생 종이 트레이와 글라신지에 담긴 토스트 파우치 패키지 콘셉트 렌더', 'Packaging concept'],
  ].map(([role, file, alt, label]) => ({
    role,
    src: `${imageRoot}/pm-007-toast-pouch/${file}`,
    alt,
    label,
  })),
}

export const objects = [
  toastPowerBank,
  toastTshirt,
  toastEcoBag,
  toastPhoneCase,
  toastAirpodsCase,
  toastCardWallet,
  toastPouch,
]

export const hiddenObjects = [
  {
    archiveId: 'PM-002',
    name: 'Cassette Memo Case',
    image: '/objects/pm-002-cassette-memo-case.webp',
  },
  {
    archiveId: 'PM-003',
    name: 'Film Roll Tape',
    image: '/objects/pm-003-film-roll-tape.webp',
  },
  {
    archiveId: 'PM-004',
    name: 'Pixel Alarm Clock',
    image: '/objects/pm-004-pixel-alarm-clock.webp',
  },
  {
    archiveId: 'PM-005',
    name: 'Folding Mood Lamp',
    image: '/objects/pm-005-folding-mood-lamp.webp',
  },
]

export const featuredObject = toastPowerBank

export function findObjectByPath(path) {
  return objects.find((object) => (
    object.href === path || object.legacyPaths?.includes(path)
  ))
}
