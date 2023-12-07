const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function stringToByteArray(str: string) {
  return encoder.encode(str)
}

export function byteArrayToString(arr) {
  return decoder.decode(arr);
}

export function untypedToTypedArray(arr) {
  return new Uint8Array(arr);
}

export function bufferToUntypedArray(arr) {
  return Array.from(new Uint8Array(arr));
}
