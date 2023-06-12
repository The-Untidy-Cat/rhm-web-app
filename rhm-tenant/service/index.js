export function isEmpty(...args) {
  let checkArr = [...args];
  if (
    checkArr.includes(null) ||
    checkArr.includes("") ||
    checkArr.includes(undefined)
  )
    return true;
  return false;
}
