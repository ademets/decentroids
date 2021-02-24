import utils from "../node_modules/decentraland-ecs-utils/index"
//import { FollowPathComponent } from "decentraland-ecs-utils/transform/component/followpath"


// helper functions
function get_random_between(min, max) {
  return Math.random() * (max - min) + min;
}

// global vars
const global_level_bounds : Vector3 = new Vector3(29, 20, 29)

const global_asteroid_radius_big : number = 3
const global_asteroid_radius_medium : number = 2.5
const global_asteroid_radius_small : number = 1.5
const global_asteroid_radius_mini : number = 0.5

const global_asteroid_shape_big : string = 'models/Planet_05/Planet_05.glb'
const global_asteroid_shape_medium : string = 'models/Comet_04/Comet_04.glb'
const global_asteroid_shape_small : string = 'models/Comet_03/Comet_03.glb'
const global_asteroid_shape_mini : string = 'models/Comet_02/Comet_02.glb'

const global_asteroid_speed_big : number = 2.5
const global_asteroid_speed_medium : number = 4
const global_asteroid_speed_small : number = 6
const global_asteroid_speed_mini : number = 7

// scene setup
const scene = new Entity()
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
scene.addComponentOrReplace(transform)
engine.addEntity(scene)


///////////////////////////////////////////////////////////////////////////////
// Components
//#region Components
@Component("asteroid_component")
export class AsteroidComponent {
  origin: Vector3
  direction: Vector3 = new Vector3(0.8,0.5,0.2)
  speed: number = 4
  max_speed: number = 10
  acceleration: number = 0.5
  bounds_radius : number = 2.5
  accelerate_on_bound_hit : boolean = true
  
}
//#endregion

///////////////////////////////////////////////////////////////////////////////
// Component Groups
//#region Component Groups
const asteroid_group = engine.getComponentGroup(AsteroidComponent, Transform);
//#endregion

///////////////////////////////////////////////////////////////////////////////
// Systems
//#region Systems - ...
export class LevelBounds implements ISystem {

  level_bounds : Vector3 = global_level_bounds

  update() {

    for (let entity of asteroid_group.entities) {
      const position = entity.getComponent(Transform).position
      const asteroid = entity.getComponent(AsteroidComponent)
      var hit_bounds = false

      if (((position.x + asteroid.bounds_radius) > this.level_bounds.x)) {
        position.x = this.level_bounds.x - asteroid.bounds_radius
        asteroid.direction.x *= -1
        hit_bounds = true
      } else if((position.x - asteroid.bounds_radius) < 0) {
        position.x = 0 + asteroid.bounds_radius
        asteroid.direction.x *= -1
        hit_bounds = true
      }

      if ((position.y + asteroid.bounds_radius) > this.level_bounds.y) {
        position.y = this.level_bounds.y - asteroid.bounds_radius
        asteroid.direction.y *= -1
        hit_bounds = true
      } else if ((position.y) < 0) {    // pivot at center bottom  - asteroid.bounds_radius
        position.y =  0 //+ asteroid.bounds_radius
        asteroid.direction.y *= -1
        hit_bounds = true
      }

      if (((position.z + asteroid.bounds_radius) > this.level_bounds.z)) {
        position.z =  this.level_bounds.z - asteroid.bounds_radius
        asteroid.direction.z *= -1
        hit_bounds = true
      } else if ((position.z - asteroid.bounds_radius) < 0) {
        position.z = 0 + asteroid.bounds_radius
        asteroid.direction.z *= -1
        hit_bounds = true
      }

      if (hit_bounds) {
        asteroid.direction.x += get_random_between(0.0, 0.2)
        asteroid.direction.y += get_random_between(0.0, 0.2)
        asteroid.direction.z += get_random_between(0.0, 0.2)
        asteroid.direction = asteroid.direction.normalize()
      }

      if (hit_bounds && asteroid.accelerate_on_bound_hit) {
        asteroid.speed += asteroid.acceleration
        if (asteroid.speed > asteroid.max_speed) {
          asteroid.speed = asteroid.max_speed
        }
      }

    }
  }
}

export class MoveAsteroids implements ISystem {
  update(dt : number) {
    //const delta = speed * dt
    for (let entity of asteroid_group.entities) {
      const position = entity.getComponent(Transform).position
      const asteroid = entity.getComponent(AsteroidComponent)

      const delta = asteroid.speed * dt
      asteroid.direction = asteroid.direction.normalize()

      position.x += delta * asteroid.direction.x
      position.y += delta * asteroid.direction.y
      position.z += delta * asteroid.direction.z

    }
  }
}
//#endregion

///////////////////////////////////////////////////////////////////////////////
// Functions
//#region Functions - Spawn Environment
function spawn_ground() {
  const groundFloorSciFi_02 = new Entity()
  groundFloorSciFi_02.setParent(scene)
  const gltfShape_23 = new GLTFShape('models/GroundFloorSciFi_02/GroundFloorSciFi_02.glb')
  groundFloorSciFi_02.addComponentOrReplace(gltfShape_23)
  const transform_25 = new Transform({
    position: new Vector3(8, 0, 8),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  groundFloorSciFi_02.addComponentOrReplace(transform_25)
  engine.addEntity(groundFloorSciFi_02)
  
  const groundFloorSciFi_02_2 = new Entity()
  groundFloorSciFi_02_2.setParent(scene)
  groundFloorSciFi_02_2.addComponentOrReplace(gltfShape_23)
  const transform_26 = new Transform({
    position: new Vector3(24, 0, 8),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  groundFloorSciFi_02_2.addComponentOrReplace(transform_26)
  engine.addEntity(groundFloorSciFi_02_2)
  
  const groundFloorSciFi_02_3 = new Entity()
  groundFloorSciFi_02_3.setParent(scene)
  groundFloorSciFi_02_3.addComponentOrReplace(gltfShape_23)
  const transform_27 = new Transform({
    position: new Vector3(8, 0, 24),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  groundFloorSciFi_02_3.addComponentOrReplace(transform_27)
  engine.addEntity(groundFloorSciFi_02_3)
  
  const groundFloorSciFi_02_4 = new Entity()
  groundFloorSciFi_02_4.setParent(scene)
  groundFloorSciFi_02_4.addComponentOrReplace(gltfShape_23)
  const transform_28 = new Transform({
    position: new Vector3(24, 0, 24),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  groundFloorSciFi_02_4.addComponentOrReplace(transform_28)
  engine.addEntity(groundFloorSciFi_02_4)
}


function spawn_hex_floor() {
  const floorHexa_01 = new Entity()
  floorHexa_01.setParent(scene)
  const gltfShape = new GLTFShape('models/FloorHexa_01/FloorHexa_01.glb')
  floorHexa_01.addComponentOrReplace(gltfShape)
  const transform_2 = new Transform({
    position: new Vector3(16.5, 0, 16),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(2, 1, 2)
  })
  floorHexa_01.addComponentOrReplace(transform_2)
  engine.addEntity(floorHexa_01)
  
  const floorHexa_01_2 = new Entity()
  floorHexa_01_2.setParent(scene)
  floorHexa_01_2.addComponentOrReplace(gltfShape)
  const transform_37 = new Transform({
    position: new Vector3(16.5, 0, 21),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  floorHexa_01_2.addComponentOrReplace(transform_37)
  engine.addEntity(floorHexa_01_2)
  
  const floorHexa_01_3 = new Entity()
  floorHexa_01_3.setParent(scene)
  floorHexa_01_3.addComponentOrReplace(gltfShape)
  const transform_38 = new Transform({
    position: new Vector3(16.5, 0, 19),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  floorHexa_01_3.addComponentOrReplace(transform_38)
  engine.addEntity(floorHexa_01_3)
  
  const floorHexa_01_4 = new Entity()
  floorHexa_01_4.setParent(scene)
  floorHexa_01_4.addComponentOrReplace(gltfShape)
  const transform_39 = new Transform({
    position: new Vector3(16.5, 0, 13),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  floorHexa_01_4.addComponentOrReplace(transform_39)
  engine.addEntity(floorHexa_01_4)
  
  const floorHexa_01_5 = new Entity()
  floorHexa_01_5.setParent(scene)
  floorHexa_01_5.addComponentOrReplace(gltfShape)
  const transform_40 = new Transform({
    position: new Vector3(16.5, 0, 11),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  floorHexa_01_5.addComponentOrReplace(transform_40)
  engine.addEntity(floorHexa_01_5)
  
}

function spawn_plants() {
  const plantSF_01 = new Entity()
  plantSF_01.setParent(scene)
  const gltfShape_12 = new GLTFShape('models/PlantSF_01/PlantSF_01.glb')
  plantSF_01.addComponentOrReplace(gltfShape_12)
  const transform_14 = new Transform({
    position: new Vector3(8.5, 0, 19.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  plantSF_01.addComponentOrReplace(transform_14)
  engine.addEntity(plantSF_01)
  
  const plantSF_08 = new Entity()
  plantSF_08.setParent(scene)
  const gltfShape_13 = new GLTFShape('models/PlantSF_08/PlantSF_08.glb')
  plantSF_08.addComponentOrReplace(gltfShape_13)
  const transform_15 = new Transform({
    position: new Vector3(12, 0, 23),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  plantSF_08.addComponentOrReplace(transform_15)
  engine.addEntity(plantSF_08)
  
  const plantSF_09 = new Entity()
  plantSF_09.setParent(scene)
  const gltfShape_14 = new GLTFShape('models/PlantSF_09/PlantSF_09.glb')
  plantSF_09.addComponentOrReplace(gltfShape_14)
  const transform_16 = new Transform({
    position: new Vector3(4.5, 0, 22.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  plantSF_09.addComponentOrReplace(transform_16)
  engine.addEntity(plantSF_09)
  
  const plantSF_13 = new Entity()
  plantSF_13.setParent(scene)
  const gltfShape_15 = new GLTFShape('models/PlantSF_13/PlantSF_13.glb')
  plantSF_13.addComponentOrReplace(gltfShape_15)
  const transform_17 = new Transform({
    position: new Vector3(25, 0, 16.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  plantSF_13.addComponentOrReplace(transform_17)
  engine.addEntity(plantSF_13)
  
  const plantSF_06 = new Entity()
  plantSF_06.setParent(scene)
  const gltfShape_16 = new GLTFShape('models/PlantSF_06/PlantSF_06.glb')
  plantSF_06.addComponentOrReplace(gltfShape_16)
  const transform_18 = new Transform({
    position: new Vector3(23, 0, 20),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  plantSF_06.addComponentOrReplace(transform_18)
  engine.addEntity(plantSF_06)

  const plantSF_11 = new Entity()
  plantSF_11.setParent(scene)
  const gltfShape_18 = new GLTFShape('models/PlantSF_11/PlantSF_11.glb')
  plantSF_11.addComponentOrReplace(gltfShape_18)
  const transform_20 = new Transform({
    position: new Vector3(29.5, 0, 19.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  plantSF_11.addComponentOrReplace(transform_20)
  engine.addEntity(plantSF_11)

  const plantSF_08_2 = new Entity()
  plantSF_08_2.setParent(scene)
  plantSF_08_2.addComponentOrReplace(gltfShape_13)
  const transform_30 = new Transform({
    position: new Vector3(11, 0, 23),
    rotation: new Quaternion(0, 0.7071067811865472, 0, 0.7071067811865476),
    scale: new Vector3(1, 1, 1)
  })
  plantSF_08_2.addComponentOrReplace(transform_30)
  engine.addEntity(plantSF_08_2)

  const plantSF_13_2 = new Entity()
  plantSF_13_2.setParent(scene)
  plantSF_13_2.addComponentOrReplace(gltfShape_15)
  const transform_31 = new Transform({
    position: new Vector3(3.5, 0, 16.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  plantSF_13_2.addComponentOrReplace(transform_31)
  engine.addEntity(plantSF_13_2)

  const plantSF_13_3 = new Entity()
  plantSF_13_3.setParent(scene)
  plantSF_13_3.addComponentOrReplace(gltfShape_15)
  const transform_35 = new Transform({
    position: new Vector3(20, 0, 25.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  plantSF_13_3.addComponentOrReplace(transform_35)
  engine.addEntity(plantSF_13_3)




  const plantSF_08_3 = new Entity()
  plantSF_08_3.setParent(scene)
  plantSF_08_3.addComponentOrReplace(gltfShape_13)
  const transform_41 = new Transform({
    position: new Vector3(11.5, 0, 24),
    rotation: new Quaternion(0, -0.5555702330196022, 0, 0.8314696123025452),
    scale: new Vector3(1, 1, 1)
  })
  plantSF_08_3.addComponentOrReplace(transform_41)
  engine.addEntity(plantSF_08_3)

  const plantSF_08_4 = new Entity()
  plantSF_08_4.setParent(scene)
  plantSF_08_4.addComponentOrReplace(gltfShape_13)
  const transform_42 = new Transform({
    position: new Vector3(11.5, 0, 22),
    rotation: new Quaternion(0, 0.5555702330196022, 0, 0.8314696123025452),
    scale: new Vector3(1, 1, 1)
  })
  plantSF_08_4.addComponentOrReplace(transform_42)
  engine.addEntity(plantSF_08_4)
}

function spawn_crater() {
  const crater_01 = new Entity()
  crater_01.setParent(scene)
  const gltfShape_20 = new GLTFShape('models/Crater_01/Crater_01.glb')
  crater_01.addComponentOrReplace(gltfShape_20)
  const transform_22 = new Transform({
    position: new Vector3(25.5, 0, 23.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  crater_01.addComponentOrReplace(transform_22)
  engine.addEntity(crater_01)
  
  const crater_03 = new Entity()
  crater_03.setParent(scene)
  const gltfShape_21 = new GLTFShape('models/Crater_03/Crater_03.glb')
  crater_03.addComponentOrReplace(gltfShape_21)
  const transform_23 = new Transform({
    position: new Vector3(5.5, 0, 7.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  crater_03.addComponentOrReplace(transform_23)
  engine.addEntity(crater_03)
  
  const crater_02 = new Entity()
  crater_02.setParent(scene)
  const gltfShape_22 = new GLTFShape('models/Crater_02/Crater_02.glb')
  crater_02.addComponentOrReplace(gltfShape_22)
  const transform_24 = new Transform({
    position: new Vector3(18.5, 0, 6),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  crater_02.addComponentOrReplace(transform_24)
  engine.addEntity(crater_02)
  
  
  
  
  const crater_01_2 = new Entity()
  crater_01_2.setParent(scene)
  crater_01_2.addComponentOrReplace(gltfShape_20)
  const transform_29 = new Transform({
    position: new Vector3(9.5, 0, 13),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  crater_01_2.addComponentOrReplace(transform_29)
  engine.addEntity(crater_01_2)
  
  
  
  const crater_01_3 = new Entity()
  crater_01_3.setParent(scene)
  crater_01_3.addComponentOrReplace(gltfShape_20)
  const transform_32 = new Transform({
    position: new Vector3(7.5, 0, 26),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  crater_01_3.addComponentOrReplace(transform_32)
  engine.addEntity(crater_01_3)
  
  const crater_02_2 = new Entity()
  crater_02_2.setParent(scene)
  crater_02_2.addComponentOrReplace(gltfShape_22)
  const transform_36 = new Transform({
    position: new Vector3(18.5, 0, 29),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  crater_02_2.addComponentOrReplace(transform_36)
  engine.addEntity(crater_02_2)
}

function spawn_comets() {
  const comet_04 = new Entity()
  comet_04.setParent(scene)
  const gltfShape_6 = new GLTFShape('models/Comet_04/Comet_04.glb')
  comet_04.addComponentOrReplace(gltfShape_6)
  const transform_7 = new Transform({
    position: new Vector3(10.5, 0, 2),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  comet_04.addComponentOrReplace(transform_7)
  engine.addEntity(comet_04)

  const comet_01 = new Entity()
  comet_01.setParent(scene)
  const gltfShape_7 = new GLTFShape('models/Comet_01/Comet_01.glb')
  comet_01.addComponentOrReplace(gltfShape_7)
  const transform_8 = new Transform({
    position: new Vector3(13, 0.5, 2.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  comet_01.addComponentOrReplace(transform_8)
  engine.addEntity(comet_01)

  const comet_02 = new Entity()
  comet_02.setParent(scene)
  const gltfShape_8 = new GLTFShape('models/Comet_02/Comet_02.glb')
  comet_02.addComponentOrReplace(gltfShape_8)
  const transform_9 = new Transform({
    position: new Vector3(15, 0, 3),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  comet_02.addComponentOrReplace(transform_9)
  engine.addEntity(comet_02)

  const comet_03 = new Entity()
  comet_03.setParent(scene)
  const gltfShape_9 = new GLTFShape('models/Comet_03/Comet_03.glb')
  comet_03.addComponentOrReplace(gltfShape_9)
  const transform_10 = new Transform({
    position: new Vector3(7.5, 0, 2),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  comet_03.addComponentOrReplace(transform_10)
  engine.addEntity(comet_03)
}

function spawn_stones() {


  const stone_02 = new Entity()
  stone_02.setParent(scene)
  const gltfShape_2 = new GLTFShape('models/Stone_02/Stone_02.glb')
  stone_02.addComponentOrReplace(gltfShape_2)
  const transform_3 = new Transform({
    position: new Vector3(21.5, 0, 14),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  stone_02.addComponentOrReplace(transform_3)
  engine.addEntity(stone_02)

  const stone_03 = new Entity()
  stone_03.setParent(scene)
  const gltfShape_3 = new GLTFShape('models/Stone_03/Stone_03.glb')
  stone_03.addComponentOrReplace(gltfShape_3)
  const transform_4 = new Transform({
    position: new Vector3(17.5, 0, 25.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  stone_03.addComponentOrReplace(transform_4)
  engine.addEntity(stone_03)

  const stone_03_2 = new Entity()
  stone_03_2.setParent(scene)
  stone_03_2.addComponentOrReplace(gltfShape_3)
  const transform_11 = new Transform({
    position: new Vector3(27.5, 0, 11),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  stone_03_2.addComponentOrReplace(transform_11)
  engine.addEntity(stone_03_2)

  const stone_01 = new Entity()
  stone_01.setParent(scene)
  const gltfShape_10 = new GLTFShape('models/Stone_01/Stone_01.glb')
  stone_01.addComponentOrReplace(gltfShape_10)
  const transform_12 = new Transform({
    position: new Vector3(26, 0, 29.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  stone_01.addComponentOrReplace(transform_12)
  engine.addEntity(stone_01)

  const stone_01_2 = new Entity()
  stone_01_2.setParent(scene)
  stone_01_2.addComponentOrReplace(gltfShape_10)
  const transform_34 = new Transform({
    position: new Vector3(5, 0, 12.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  stone_01_2.addComponentOrReplace(transform_34)
  engine.addEntity(stone_01_2)

  const stone_03_3 = new Entity()
  stone_03_3.setParent(scene)
  stone_03_3.addComponentOrReplace(gltfShape_3)
  const transform_33 = new Transform({
    position: new Vector3(23.5, 0, 12),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  stone_03_3.addComponentOrReplace(transform_33)
  engine.addEntity(stone_03_3)
}

function spawn_stars() {
  const star_01 = new Entity()
  star_01.setParent(scene)
  const gltfShape_19 = new GLTFShape('models/Star_01/Star_01.glb')
  star_01.addComponentOrReplace(gltfShape_19)
  const transform_21 = new Transform({
    position: new Vector3(28.5, 0, 6),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  star_01.addComponentOrReplace(transform_21)
  engine.addEntity(star_01)
}

function spawn_planets() {
  const planet_04 = new Entity()
  planet_04.setParent(scene)
  const gltfShape_4 = new GLTFShape('models/Planet_04/Planet_04.glb')
  planet_04.addComponentOrReplace(gltfShape_4)
  const transform_5 = new Transform({
    position: new Vector3(4.5, 8, 24.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  planet_04.addComponentOrReplace(transform_5)
  engine.addEntity(planet_04)

  const planet_05 = new Entity()
  planet_05.setParent(scene)
  const gltfShape_11 = new GLTFShape('models/Planet_05/Planet_05.glb')
  planet_05.addComponentOrReplace(gltfShape_11)
  const transform_13 = new Transform({
    position: new Vector3(3, 0, 3),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  planet_05.addComponentOrReplace(transform_13)
  engine.addEntity(planet_05)

  const planet_03 = new Entity()
  planet_03.setParent(scene)
  const gltfShape_17 = new GLTFShape('models/Planet_03/Planet_03.glb')
  planet_03.addComponentOrReplace(gltfShape_17)
  const transform_19 = new Transform({
    position: new Vector3(24, 1, 7.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  planet_03.addComponentOrReplace(transform_19)
  engine.addEntity(planet_03)
}
//#endregion
//---------------------------------------------------------------------------------------
//#region Functions - Spawn Entities
function destroy_asteroid(asteroid : Entity) {
  engine.removeEntity(asteroid)
}
function spawn_asteroid(location : Vector3, direction_ : Vector3, velocity_ : number, radius_ : number, mesh_name : string) : Entity {
  // asteroid: 2.3,2.3,0
  const asteroid_entity = new Entity()
  asteroid_entity.setParent(scene)

  const asteroid_shape = new GLTFShape(mesh_name)
  const mesh_transform = new Transform({
    position: new Vector3(0, radius_, 0),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  asteroid_entity.addComponentOrReplace(asteroid_shape)
  //const asteroid_mesh_entity = new Entity()
  //asteroid_mesh_entity.addComponentOrReplace(asteroid_shape)
  //asteroid_mesh_entity.setParent(asteroid_entity)
  //asteroid_mesh_entity.addComponentOrReplace(mesh_transform)
  //asteroid_mesh_entity.getComponent(Transform).position.y -= radius_

  const asteroid_transform = new Transform({
    position: new Vector3(0, 0, 0),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  asteroid_transform.position.set(location.x, location.y, location.z)
  asteroid_entity.addComponentOrReplace(asteroid_transform)

  asteroid_entity.addComponentOrReplace(new AsteroidComponent())

  //asteroid_entity.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(get_random_between(0,15), get_random_between(0,15), get_random_between(0,15))))

  //asteroid_entity.addComponent(new SphereShape())

  const asteroid = asteroid_entity.getComponent(AsteroidComponent)
  asteroid.speed = velocity_
  asteroid.direction = direction_
  asteroid.bounds_radius = radius_

  engine.addEntity(asteroid_entity)

  return asteroid_entity
}

function spawn_asteroid_random(velocity_ : number, radius_ : number, mesh_name : string, pos? : Vector3) : Entity {
  var spawn_pos : Vector3 = new Vector3(0,0,0)
  
  if (pos === undefined) {
    spawn_pos = new Vector3(get_random_between(radius_, global_level_bounds.x - radius_),
    get_random_between(10, global_level_bounds.y - radius_),
    get_random_between(radius_, global_level_bounds.z - radius_))
  } else {
    spawn_pos = pos
  }
  
  return spawn_asteroid(spawn_pos, new Vector3(get_random_between(0.2, 0.9),get_random_between(0.2, 0.9),get_random_between(0.2, 0.9)), velocity_, radius_, mesh_name)
}


function spawn_asteroid_big() : Entity {
  const asteroid = spawn_asteroid_random(global_asteroid_speed_big, global_asteroid_radius_big, global_asteroid_shape_big)
  asteroid.addComponent(new OnClick(e => {
    const position = asteroid.getComponent(Transform).position
    destroy_asteroid(asteroid)
    spawn_asteroid_medium(position)
    spawn_asteroid_medium(position)
    spawn_asteroid_medium(position)
  }))
  return asteroid
}
function spawn_asteroid_medium(pos? : Vector3) : Entity {
  const asteroid =  spawn_asteroid_random(global_asteroid_speed_medium, global_asteroid_radius_medium, global_asteroid_shape_medium, pos)
  asteroid.addComponent(new OnClick(e => {
    const position = asteroid.getComponent(Transform).position
    destroy_asteroid(asteroid)
    spawn_asteroid_small(position)
    spawn_asteroid_small(position)
    spawn_asteroid_small(position)
  }))
  return asteroid
}
function spawn_asteroid_small(pos? : Vector3) : Entity {
  const asteroid =  spawn_asteroid_random(global_asteroid_speed_small, global_asteroid_radius_small, global_asteroid_shape_small, pos)
  asteroid.addComponent(new OnClick(e => {
    const position = asteroid.getComponent(Transform).position
    destroy_asteroid(asteroid)
    spawn_asteroid_mini(position)
    spawn_asteroid_mini(position)
    spawn_asteroid_mini(position)
  }))
  return asteroid
}
function spawn_asteroid_mini(pos? : Vector3) : Entity {
  const asteroid =  spawn_asteroid_random(global_asteroid_speed_mini, global_asteroid_radius_mini, global_asteroid_shape_mini, pos)
  asteroid.addComponent(new OnClick(e => {
    const position = asteroid.getComponent(Transform).position
    destroy_asteroid(asteroid)
  }))
  return asteroid
}

function spawn_level() {
  spawn_asteroid_big()
  spawn_asteroid_big()
  spawn_asteroid_big()
  //spawn_asteroid(new Vector3(7,6,5), new Vector3(0.5,0.7,0.6), 3)
}
//#endregion



///////////////////////////////////////////////////////////////////////////////
// Game Code
spawn_ground()
spawn_hex_floor()
spawn_level()
engine.addSystem(new MoveAsteroids())
engine.addSystem(new LevelBounds())

// spawn asteroids

// setup player

// loop
