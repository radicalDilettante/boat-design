interface Deck {
  add(material: string): void;
}

export class VShaped implements Deck {
  add(material: string): void {
    console.log("add deck with" + material);
  }
}
export class RoundBottom implements Deck {
  add(material: string): void {
    console.log("add deck with" + material);
  }
}
export class FlatBottom implements Deck {
  add(material: string): void {
    console.log("add deck with" + material);
  }
}
