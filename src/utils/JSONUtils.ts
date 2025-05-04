export class JSONUtils {
  public static formatStringify(value: any): string {
    return JSON.stringify(value, null, 2);
  }

  public static stringify(value: any): string {
    return JSON.stringify(value);
  }

  public static parse<V>(value: string): V {
    return JSON.parse(value) as V;
  }
}
