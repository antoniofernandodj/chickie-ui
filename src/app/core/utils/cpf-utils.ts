export function formatCpf(digits: string): string {
  const d = digits.replace(/\D/g, '').slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

export function validarCpf(cpf: string): boolean {
  const d = cpf.replace(/\D/g, '');
  if (d.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(d)) return false;

  const digits = d.split('').map(Number);

  // Primeiro dígito verificador
  const soma1 = digits.slice(0, 9).reduce((acc, n, i) => acc + n * (10 - i), 0);
  const resto1 = soma1 % 11;
  const d1 = resto1 < 2 ? 0 : 11 - resto1;
  if (digits[9] !== d1) return false;

  // Segundo dígito verificador
  const soma2 = digits.slice(0, 10).reduce((acc, n, i) => acc + n * (11 - i), 0);
  const resto2 = soma2 % 11;
  const d2 = resto2 < 2 ? 0 : 11 - resto2;
  return digits[10] === d2;
}
