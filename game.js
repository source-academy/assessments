(_params) => {
  const Phaser = _params.phaser;
  const scene = _params.scene;
  const preload_map = _params.preload_map;
  const preloader = _params.preloader;

  const type_key = "type";

  const image_type = "image";
  const text_type = "text";
  const rect_type = "rect";
  const ellipse_type = "ellipse";
  const container_type = "container";
  const obj_types = [
    image_type,
    text_type,
    rect_type,
    ellipse_type,
    container_type,
  ];

  const null_str = "";
  const null_fn = () => {};

  ///////////////////////////
  //        HELPER         //
  ///////////////////////////

  function is_type(obj, type) {
    return obj.data.get(type_key) === type;
  }

  function is_any_type(obj, types) {
    for (let i = 0; i < types.length; i++) {
      if (is_type(obj, types[i])) return true;
    }
    return false;
  }

  function set_type(obj, type) {
    obj.setDataEnabled();
    obj.data.set(type_key, type);
    return obj;
  }

  ///////////////////////////
  //          LOAD         //
  ///////////////////////////

  function load_image(key, url) {
    preload_map.set(key, url);
    preloader.addKey(key, url);
    scene.load.image(key, url);
  }

  function load_sound(key, url) {
    scene.load.audio(key, url);
  }

  ///////////////////////////
  //          ADD          //
  ///////////////////////////

  function add_to_scene(obj) {
    if (obj && is_any_type(obj, obj_types)) {
      scene.add.existing(obj);
    } else {
      throw console.error(`${obj} is not of type ${obj_types}`);
    }
  }

  ///////////////////////////
  //         SOUND         //
  ///////////////////////////

  function play_sound(key, config) {
    scene.sound.play(key, config);
  }

  ///////////////////////////
  //         IMAGE         //
  ///////////////////////////

  function create_image(x, y, asset_key) {
    const image = new Phaser.GameObjects.Sprite(scene, x, y, asset_key);
    return set_type(image, image_type);
  }

  ///////////////////////////
  //         TEXT          //
  ///////////////////////////

  function create_text(x, y, text, style) {
    const txt = new Phaser.GameObjects.Text(scene, x, y, text, style);
    return set_type(txt, text_type);
  }

  ///////////////////////////
  //       RECTANGLE       //
  ///////////////////////////

  function create_rect(x, y, width, height, fill = 0, alpha = 1) {
    const rect = new Phaser.GameObjects.Rectangle(
      scene,
      x,
      y,
      width,
      height,
      fill,
      alpha
    );
    return set_type(rect, rect_type);
  }

  ///////////////////////////
  //        ELLIPSE        //
  ///////////////////////////

  function create_ellipse(x, y, width, height, fill = 0, alpha = 1) {
    const ellipse = new Phaser.GameObjects.Ellipse(
      scene,
      x,
      y,
      width,
      height,
      fill,
      alpha
    );
    return set_type(ellipse, ellipse_type);
  }

  ///////////////////////////
  //       CONTAINER       //
  ///////////////////////////

  function create_container(x, y) {
    const cont = new Phaser.GameObjects.Container(scene, x, y);
    return set_type(cont, container_type);
  }

  function add_to_container(container, obj) {
    const correct_types =
      is_type(container, container_type) && is_any_types(obj, obj_types);
    if (container && obj && correct_types) {
      container.add(obj);
    } else {
      throw console.error(
        `${obj} is not of type ${obj_types} or ${container} is not of type ${container_type}`
      );
    }
  }

  ///////////////////////////
  //         OBJECT        //
  ///////////////////////////

  function set_display_size(obj, x, y) {
    if (obj && is_any_type(obj, obj_types)) {
      obj.setDisplaySize(x, y);
    } else {
      throw console.error(`${obj} is not of type ${obj_types}`);
    }
  }

  function set_alpha(obj, alpha) {
    if (obj && is_any_type(obj, obj_types)) {
      obj.setAlpha(alpha);
    } else {
      throw console.error(`${obj} is not of type ${obj_types}`);
    }
  }

  function set_interactive(obj, shape) {
    if (obj && is_any_type(obj, obj_types)) {
      obj.setInteractive(shape);
    } else {
      throw console.error(`${obj} is not of type ${obj_types}`);
    }
  }

  function set_origin(obj, x, y) {
    if (obj && is_any_type(obj, obj_types)) {
      obj.setOrigin(x, y);
    } else {
      throw console.error(`${obj} is not of type ${obj_types}`);
    }
  }

  function set_scale(obj, x, y) {
    if (obj && is_any_type(obj, obj_types)) {
      obj.setScale(x, y);
    } else {
      throw console.error(`${obj} is not of type ${obj_types}`);
    }
  }

  function set_rotation(obj, rad) {
    if (obj && is_any_type(obj, obj_types)) {
      obj.setRotation(rad);
    } else {
      throw console.error(`${obj} is not of type ${obj_types}`);
    }
  }

  function set_flip(obj, x, y) {
    if (obj && is_any_type(obj, obj_types)) {
      obj.setFlip(x, y);
    } else {
      throw console.error(`${obj} is not of type ${obj_types}`);
    }
  }

  function add_listener(obj, event, callback) {
    if (obj && is_any_type(obj, obj_types)) {
      obj.addListener(event, callback);
    } else {
      throw console.error(`${obj} is not of type ${obj_types}`);
    }
  }

  function add_tween(obj, tween_prop) {
    if (obj && is_any_type(obj, obj_types)) {
      scene.tweens.add({
        targets: obj,
        ...tween_prop,
      });
    } else {
      throw console.error(`${obj} is not of type ${obj_types}`);
    }
  }

  const functions = {
    load_image: load_image,
    load_sound: load_sound,
    add: add_to_scene,
    play_sound: play_sound,
    create_image: create_image,
    create_text: create_text,
    create_rect: create_rect,
    create_ellipse: create_ellipse,
    create_container: create_container,
    add_to_container: add_to_container,
    set_display_size: set_display_size,
    set_alpha: set_alpha,
    set_interactive: set_interactive,
    set_origin: set_origin,
    set_scale: set_scale,
    set_rotation: set_rotation,
    set_flip: set_flip,
    add_listener: add_listener,
    add_tween: add_tween,
  };

  let final_functions = {};

  Object.entries(functions).map(([key, fn]) => {
    final_functions[key] = !Phaser || !scene ? null_fn : fn;
  });

  return final_functions;
}
