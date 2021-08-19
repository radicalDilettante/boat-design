interface Hull {
  add(material: string): void;
}

export class VShaped implements Hull {
  add(material: string): void {
    console.log("add hull with" + material);
  }
}
export class RoundBottom implements Hull {
  add(material: string): void {
    console.log("add hull with" + material);
  }
}
export class FlatBottom implements Hull {
  add(material: string): void {
    console.log("add hull with" + material);
  }
}
