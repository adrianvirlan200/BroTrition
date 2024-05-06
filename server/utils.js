export function displayNumberOfCalories(pr, ca, ft) {
  let x = pr * 4 + ca * 4 + ft * 9;
  x = Math.trunc(10 * x) / 10;
  return x;
}

export function truncMacro(val) {
  return Math.trunc(val * 10) / 10;
}

export function calculatePercentageOfNutrients(pr, ca, ft) {
  //calculate the percentage
  const total = pr + ca + ft;
  let prProc = (pr / total) * 10;
  let caProc = (ca / total) * 10;
  let ftProc = (ft / total) * 10;

  //truncate the values
  prProc = Math.trunc(10 * prProc) / 10;
  caProc = Math.trunc(10 * caProc) / 10;
  ftProc = Math.trunc(10 * ftProc) / 10;

  return [prProc, caProc, ftProc];
}

export default function justForTheSakeOfTheCompiler() {
  const msg = "What are you doing here?";
  return msg;
}
