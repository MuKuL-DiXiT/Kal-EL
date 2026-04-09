import type { HolidaysMap, Holiday } from '@/types';

/**
 * Fetch holidays from nager.Date API
 * Supports multiple countries, returns public holidays
 */
export async function fetchHolidaysFromApi(
  year: number,
  countryCode: string = 'IN' // Default to India
): Promise<HolidaysMap> {
  try {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`API returned status ${response.statusText}`);
      return {};
    }

    // Check if response has content
    const contentLength = response.headers.get('content-length');
    if (contentLength === '0') {
      console.warn('API returned empty response');
      return {};
    }

    // Get response text first to check if it's valid
    const text = await response.text();
    
    if (!text) {
      console.warn('API returned empty body');
      return {};
    }

    // Try to parse JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse API response:', parseError);
      return {};
    }

    // Validate data is an array
    if (!Array.isArray(data)) {
      console.warn('API response is not an array');
      return {};
    }

    // Transform API response to HolidaysMap format
    const holidaysMap: HolidaysMap = {};
    data.forEach(
      (holiday: { date?: string; name?: string; localName?: string }) => {
        if (holiday.date && (holiday.name || holiday.localName)) {
          holidaysMap[holiday.date] = {
            name: holiday.localName || holiday.name || 'Holiday',
            emoji: getEmojiForHoliday(holiday.name || '', holiday.localName),
          };
        }
      }
    );

    return holidaysMap;
  } catch (error) {
    console.error('Error fetching holidays from API:', error);
    return {};
  }
}

/**
 * Get emoji based on holiday name
 */
function getEmojiForHoliday(name: string, localName?: string): string {
  const fullName = (localName || name).toLowerCase();

  // Map keywords to emojis
  const emojiMap: Record<string, string> = {
    republic: '🇮🇳',
    independence: '🇮🇳',
    holi: '🌈',
    diwali: '🪔',
    christmas: '🎄',
    good: '✝️',
    easter: '🥚',
    thanksgiving: '🦃',
    new: '🎆',
    mother: '👩',
    father: '👨',
    labour: '💼',
    may: '🎉',
    dussehra: '🏹',
    janmashtami: '🐚',
    'milad-un-nabi': '🌙',
    gandhi: '🕯️',
    ambedkar: '📚',
    govardhan: '⛰️',
    bhai: '👥',
    ram: '🛕',
  };

  for (const [keyword, emoji] of Object.entries(emojiMap)) {
    if (fullName.includes(keyword)) {
      return emoji;
    }
  }

  return '📅'; // Default emoji
}

/**
 * Get holidays for a specific month from API
 */
export async function getMonthHolidaysFromApi(
  date: Date,
  countryCode: string = 'IN'
): Promise<Holiday[]> {
  try {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed

    const allHolidays = await fetchHolidaysFromApi(year, countryCode);

    // Filter holidays for the current month
    const monthHolidays: Holiday[] = [];
    for (const [dateStr, holiday] of Object.entries(allHolidays)) {
      if (!dateStr || typeof dateStr !== 'string') continue;
      
      try {
        const [y, m] = dateStr.split('-').map(Number);
        if (y === year && m === month) {
          if (holiday && holiday.name) {
            monthHolidays.push(holiday);
          }
        }
      } catch (e) {
        // Skip invalid date format
        console.warn(`Invalid date format: ${dateStr}`);
      }
    }

    return monthHolidays;
  } catch (error) {
    console.error('Error getting month holidays:', error);
    return [];
  }
}

/**
 * Merge API holidays with predefined holidays (predefined take precedence)
 */
export async function getMergedHolidaysForYear(
  year: number,
  predefinedHolidays: HolidaysMap,
  countryCode: string = 'IN'
): Promise<HolidaysMap> {
  const apiHolidays = await fetchHolidaysFromApi(year, countryCode);

  // Merge with predefined taking precedence
  return {
    ...apiHolidays,
    ...predefinedHolidays,
  };
}
