export class JSONUtils {
  public static formatStringify(value: any): string {
    return JSON.stringify(value, null, 2);
  }

  public static stringify(value: any): string {
    return JSON.stringify(value);
  }

  public static parse<V>(value: string): V {
    try {
      return JSON.parse(value) as V;
    } catch (e) {
      //todo
      console.log(e);

      throw e;
    }
  }
}
