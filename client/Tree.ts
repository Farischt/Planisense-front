import { ApiService } from "./Api";
import type { AreaWithCount, GenderWithCount, Tree } from "../index.d";

export class TreeService {
  public static async getTree(id: number): Promise<Tree> {
    return await ApiService.get<Tree>(`trees/${id}`);
  }

  public static async getAreaWithCount(): Promise<AreaWithCount[]> {
    return await ApiService.get<AreaWithCount[]>(`trees/areas?paris=false`);
  }

  public static async getGenderWithCount(): Promise<GenderWithCount[]> {
    return await ApiService.get<GenderWithCount[]>(`trees/genders`);
  }

  public static async generateTrees(numberOfTrees: number): Promise<Tree[]> {
    return await ApiService.post<Tree[], { numberOfTrees: number }>(
      `trees/generate/${numberOfTrees}`,
      { numberOfTrees }
    );
  }
}
