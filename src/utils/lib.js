export function getFirstName(fullName) {
  const names = fullName.split(" ");
  return names[0];
}

export function getUUIDFromPath(path) {
  const uuid = path.split('/').pop();
  return uuid;
}
