import {
  PolygonalChainShape,
  SpawnPointShape,
  SpawnRectangleShape,
  SpawnShapeBehavior,
  SpawnShapeType,
  SpawnTorusShape,
} from "particle-flux";
import { Store } from "../Store";

export class SpawnShapeBehaviorStore extends Store<{
  pointShape: SpawnPointShape;
  circleShape: SpawnTorusShape;
  rectangleShape: SpawnRectangleShape;
  polygonalShape: PolygonalChainShape;
  activeShape: SpawnShapeType;
}> {
  constructor() {
    super({
      activeShape: SpawnShapeType.Point,
      pointShape: {
        type: SpawnShapeType.Point,
        x: 0,
        y: 0,
      },
      circleShape: {
        type: SpawnShapeType.Torus,
        x: 0,
        y: 0,
        innerRadius: 0,
        outerRadius: 0,
      },
      rectangleShape: {
        type: SpawnShapeType.Rectangle,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      polygonalShape: {
        type: SpawnShapeType.Polygon,
        chain: [
          {
            x: 0,
            y: 0,
          },
        ],
      },
    });
  }

  public setPointShapeConfig(config: SpawnPointShape): void {
    this.setState({
      ...this.state,
      pointShape: config,
    });
  }

  public setTorusShapeConfig(config: SpawnTorusShape): void {
    this.setState({
      ...this.state,
      circleShape: config,
    });
  }

  public setRectangleShapeConfig(config: SpawnRectangleShape): void {
    this.setState({
      ...this.state,
      rectangleShape: config,
    });
  }

  public setPolygonalShapeConfig(config: PolygonalChainShape): void {
    this.setState({
      ...this.state,
      polygonalShape: config,
    });
  }

  public setActiveType(type: SpawnShapeType): void {
    this.setState({ ...this.state, activeShape: type });
  }

  public isRectangleShapeActive(): boolean {
    return this.state.activeShape === SpawnShapeType.Rectangle;
  }

  public isTorusShapeActive(): boolean {
    return this.state.activeShape === SpawnShapeType.Torus;
  }

  public isPointShapeActive(): boolean {
    return this.state.activeShape === SpawnShapeType.Point;
  }

  public isPolygonShapeActive(): boolean {
    return this.state.activeShape === SpawnShapeType.Polygon;
  }

  public getActiveConfig(): SpawnShapeBehavior {
    switch (this.state.activeShape) {
      case SpawnShapeType.Point:
        return this.state.pointShape;

      case SpawnShapeType.Torus:
        return this.state.circleShape;

      case SpawnShapeType.Rectangle:
        return this.state.rectangleShape;

      case SpawnShapeType.Polygon:
        return this.state.polygonalShape;
    }
  }
}
