const getCountryFlag = (countryCode) => {
  // return '🌏' for non-valid country code
  if (!countryCode || countryCode.length !== 2) return '🌏';

  let flagOffset = 0x1F1E6;
  let asciiOffset = 0x41;
  let firstChar = countryCode.codePointAt(0) - asciiOffset + flagOffset;
  let secondChar = countryCode.codePointAt(1) - asciiOffset + flagOffset;


  return String.fromCodePoint(firstChar) + String.fromCodePoint(secondChar);
}

export default getCountryFlag
