import {
  CHARACTER_DEFINITIONS,
  CATEGORY_TEMPLATES,
  COLOR_BY_CATEGORY,
  AVATARS_BY_CATEGORY
} from './characters-data.js';

const CATEGORY_LABELS = {
  military: 'Tướng lĩnh',
  leader: 'Lãnh đạo',
  scholar: 'Học giả',
  revolutionary: 'Cách mạng'
};

const DEFAULT_TRAITS = {
  traits: [
    'Giữ gìn lòng yêu nước và trách nhiệm với cộng đồng',
    'Khiêm nhường nhưng không ngại bảo vệ lẽ phải'
  ],
  speech: [
    'Ngôn từ trang trọng, khích lệ tinh thần học hỏi',
    'Nhắc đến bài học lịch sử gắn với đời sống hiện tại'
  ],
  knowledge: [
    'Lịch sử và văn hóa Việt Nam',
    'Giữ gìn bản sắc dân tộc trong thời đại mới'
  ]
};

function generateAvatar(category, index) {
  const options = AVATARS_BY_CATEGORY[category] || ['⭐'];
  return options[index % options.length];
}

function normalise(text) {
  return text
    ? text
        .toString()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .replace(/đ/g, 'd')
        .trim()
    : '';
}

function buildSystemPrompt(character) {
  const template = CATEGORY_TEMPLATES[character.category] || DEFAULT_TRAITS;
  const traitLines = (template.traits || DEFAULT_TRAITS.traits)
    .map(line => `- ${line}`)
    .join('\n');
  const speechLines = (template.speech || DEFAULT_TRAITS.speech)
    .map(line => `- ${line}`)
    .join('\n');
  const knowledgeLines = (template.knowledge || DEFAULT_TRAITS.knowledge)
    .map(line => `- ${line}`)
    .join('\n');
  const highlightLines = (character.highlights && character.highlights.length
    ? character.highlights
    : ['Lan tỏa niềm tự hào học lịch sử Việt Nam'])
    .map(line => `- ${line}`)
    .join('\n');

  const identity = [character.name, character.title]
    .filter(Boolean)
    .join(', ');

  const timeline = [character.era, character.dynasty]
    .filter(Boolean)
    .join(' – ');

  return `Bạn là ${identity}${timeline ? ` sống vào ${timeline}` : ''}.

NHÂN CÁCH:
${traitLines}

CÁCH NÓI CHUYỆN:
${speechLines}

KIẾN THỨC CHUYÊN SÂU:
${knowledgeLines}

THÀNH TỰU NỔI BẬT:
${highlightLines}

Trả lời bằng tiếng Việt trang trọng, gợi mở kiến thức, truyền cảm hứng yêu lịch sử.`;
}

function createSearchIndex(character) {
  // Chỉ tìm kiếm theo name và title, không tìm theo description
  const tokens = [
    character.name,
    character.title,
    // character.description, // Bỏ description
    character.era,
    character.dynasty,
    CATEGORY_LABELS[character.category],
    character.category,
    // character.previewQuote, // Bỏ previewQuote
    // ...(character.highlights || []) // Bỏ highlights
  ];

  return tokens.map(normalise).filter(Boolean).join(' ');
}

function enrichCharacter(definition, index) {
  const category = definition.category || 'leader';
  const color = definition.color || COLOR_BY_CATEGORY[category] || '#2563eb';

  const enriched = {
    ...definition,
    avatar: definition.avatar || generateAvatar(category, index),
    color,
    systemPrompt: definition.systemPrompt || buildSystemPrompt(definition),
    voicePreview: definition.voicePreview ?? true,
    searchIndex: createSearchIndex(definition)
  };

  delete enriched.refId;

  return enriched;
}

const CHARACTERS = CHARACTER_DEFINITIONS.map(enrichCharacter);

export function getCharacters() {
  return CHARACTERS;
}

export function getCharacterById(id) {
  return CHARACTERS.find(char => char.id === id) || null;
}

export function searchCharacters(query) {
  const normalisedQuery = normalise(query);
  if (!normalisedQuery) return CHARACTERS;
  return CHARACTERS.filter(char => char.searchIndex.includes(normalisedQuery));
}

export function filterByCategory(category) {
  if (!category || category === 'all') return CHARACTERS;
  return CHARACTERS.filter(char => char.category === category);
}

export function filterByGender(gender) {
  if (!gender || gender === 'all') return CHARACTERS;
  return CHARACTERS.filter(char => char.gender === gender);
}

export function filterByDynasty(dynasty) {
  if (!dynasty || dynasty === 'all') return CHARACTERS;
  const normalisedDynasty = normalise(dynasty);
  return CHARACTERS.filter(char => normalise(char.dynasty) === normalisedDynasty);
}

export function filterCharacters(filters = {}) {
  let results = CHARACTERS;

  if (filters.search) {
    const normalisedQuery = normalise(filters.search);
    results = results.filter(char => char.searchIndex.includes(normalisedQuery));
  }

  if (filters.category && filters.category !== 'all') {
    results = results.filter(char => char.category === filters.category);
  }

  if (filters.gender && filters.gender !== 'all') {
    results = results.filter(char => char.gender === filters.gender);
  }

  if (filters.dynasty && filters.dynasty !== 'all') {
    const normalisedDynasty = normalise(filters.dynasty);
    results = results.filter(char => normalise(char.dynasty) === normalisedDynasty);
  }

  return results;
}

export function getFilterOptions() {
  const categories = new Map();
  const dynasties = new Map();
  const genders = new Map();

  CHARACTERS.forEach(char => {
    if (!categories.has(char.category)) {
      categories.set(char.category, 0);
    }
    categories.set(char.category, categories.get(char.category) + 1);

    if (char.dynasty) {
      const key = char.dynasty;
      if (!dynasties.has(key)) {
        dynasties.set(key, 0);
      }
      dynasties.set(key, dynasties.get(key) + 1);
    }

    if (char.gender) {
      if (!genders.has(char.gender)) {
        genders.set(char.gender, 0);
      }
      genders.set(char.gender, genders.get(char.gender) + 1);
    }
  });

  return {
    categories: Array.from(categories.entries()).map(([value, count]) => ({
      value,
      label: `${CATEGORY_LABELS[value] || value} (${count})`
    })),
    dynasties: Array.from(dynasties.entries()).map(([value, count]) => ({
      value,
      label: `${value} (${count})`
    })),
    genders: Array.from(genders.entries()).map(([value, count]) => ({
      value,
      label: value === 'male' ? `Nam (${count})` : `Nữ (${count})`
    }))
  };
}

export function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}
