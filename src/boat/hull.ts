interface Hull {
  add(material: string): void;
}

export class Trailer implements Hull {
  add(material: string): void {
    console.log("add hull with" + material);
  }
}
