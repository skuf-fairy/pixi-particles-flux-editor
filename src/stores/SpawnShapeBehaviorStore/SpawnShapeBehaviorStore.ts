import {
  SpawnPointShape,
  SpawnPolygonalChainShape,
  SpawnRectangleShape,
  SpawnShapeBehavior,
  SpawnShapeType,
  SpawnTorusShape,
  isSinglePolygonalChain,
  isSpawnPointShape,
  isSpawnPolygonalShape,
  isSpawnRectangleShape,
  isSpawnTorusShape,
} from "particle-flux";
import { Store } from "../Store";

export class SpawnShapeBehaviorStore extends Store<{
  pointShape: SpawnPointShape;
  circleShape: SpawnTorusShape;
  rectangleShape: SpawnRectangleShape;
  polygonalShape: SpawnPolygonalChainShape;
  activeShape: SpawnShapeType;
  isGroupWave: boolean;
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
        startAngle: 0,
        endAngle: 360,
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
        ],
      },
      isDisplayShape: false,
      isGroupWave: false,
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

  public setPolygonalShapeConfig(config: SpawnPolygonalChainShape): void {
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

  public setIsGroupWave(value: boolean): void {
    this.setValue("isGroupWave", value);
  }

  public isGroupWave(): boolean {
    return this.state.isGroupWave;
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
        return {
          shape: this.state.pointShape,
          isGroupWave: this.state.isGroupWave,
        };

      case SpawnShapeType.Torus:
        return {
          shape: this.state.circleShape,
          isGroupWave: this.state.isGroupWave,
        };

      case SpawnShapeType.Rectangle:
        return {
          shape: this.state.rectangleShape,
          isGroupWave: this.state.isGroupWave,
        };

      case SpawnShapeType.Polygon:
        return {
          shape: this.state.polygonalShape,
          isGroupWave: this.state.isGroupWave,
        };
    }
  }

  public restore(shapeBehavior: SpawnShapeBehavior): void {
    const shape = shapeBehavior.shape;
    if (isSpawnPointShape(shape)) {
      this.setPointShapeConfig(shape);
    } else if (isSpawnTorusShape(shape)) {
      this.setTorusShapeConfig(shape);
    } else if (isSpawnRectangleShape(shape)) {
      this.setRectangleShapeConfig(shape);
    } else if (isSpawnPolygonalShape(shape)) {
      this.setPolygonalShapeConfig(shape);
    }

    this.setIsGroupWave(shapeBehavior.isGroupWave || false);
    this.setActiveType(shape.type);
  }

  public setDisplayShape(isDisplayShape: boolean): void {
    this.setValue("isDisplayShape", isDisplayShape);
  }

  public isDisplayShape(): boolean {
    return this.state.isDisplayShape;
  }
}
