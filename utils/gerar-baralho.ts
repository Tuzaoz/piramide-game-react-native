type Naipe = "Copas" | "Ouros" | "Paus" | "Espadas";
type Valor =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13";

export interface Carta {
  valor: Valor;
  naipe: Naipe;
}

const naipes: Naipe[] = ["Copas", "Ouros", "Paus", "Espadas"];
const valores: Valor[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];

export function gerarBaralho(): Carta[] {
  const baralho: Carta[] = [];

  for (const naipe of naipes) {
    for (const valor of valores) {
      baralho.push({ valor, naipe });
    }
  }

  return baralho;
}

export function embaralharBaralho(baralho: Carta[]): Carta[] {
  for (let i = baralho.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [baralho[i], baralho[j]] = [baralho[j], baralho[i]]; // Swap
  }
  return baralho;
}
