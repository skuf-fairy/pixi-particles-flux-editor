import {
  PolygonalChain,
  PolygonalChainShape,
  SpawnPointShape,
  SpawnRectangleShape,
  SpawnShapeBehavior,
  SpawnShapeType,
  SpawnTorusShape,
  isSinglePolygonalChain,
} from "particle-flux";
import { Store } from "../Store";

export class SpawnShapeBehaviorStore extends Store<{
  pointShape: SpawnPointShape;
  circleShape: SpawnTorusShape;
  rectangleShape: SpawnRectangleShape;
  polygonalShape: PolygonalChainShape;
  activeShape: SpawnShapeType;
  isDisplayShape: boolean;
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
          {
            x: 0,
            y: 0,
          },
          {
            x: 0,
            y: 0,
          },
          {
            x: 0,
            y: 0,
          },
        ],
      },
      isDisplayShape: false,
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
      polygonalShape: {
        type: config.type,
        chain: !isSinglePolygonalChain(config.chain) && config.chain.length === 1 ? config.chain[0] : config.chain,
      },
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

  public restore(config: SpawnShapeBehavior): void {
    if (config.type === SpawnShapeType.Point) {
      this.setPointShapeConfig(config);
    } else if (config.type === SpawnShapeType.Torus) {
      this.setTorusShapeConfig(config);
    } else if (config.type === SpawnShapeType.Rectangle) {
      this.setRectangleShapeConfig(config);
    } else if (config.type === SpawnShapeType.Polygon) {
      this.setPolygonalShapeConfig(config);
    }

    this.setActiveType(config.type);
  }

  public setDisplayShape(isDisplayShape: boolean): void {
    this.setValue("isDisplayShape", isDisplayShape);
  }

  public isDisplayShape(): boolean {
    return this.state.isDisplayShape;
  }
}
