const { Translate } = require('@google-cloud/translate').v2;

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectLocation = process.env.NEXT_PUBLIC_LOCATION;
const key = process.env.NEXT_PUBLIC_TRANSLATE_API_KEY;

const translate = new Translate({
  projectId,
  projectLocation,
  key,
});

export async function translateText(text: string, srouceLanguageCode: string, targetLanguageCode: string) {

  const [translation] = await translate.translate(text, {
    from: srouceLanguageCode,
    to: targetLanguageCode
  });

  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
  return translation;
}
