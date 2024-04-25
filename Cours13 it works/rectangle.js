function creerObj3DRectangle(objgl) {
    const obj3DRectangle = new Object();
    obj3DRectangle.vertex = creerRectangle(objgl);
    obj3DRectangle.couleurs = creerCouleursRectangle(objgl);
    obj3DRectangle.maillage = null
    obj3DRectangle.texels = creerTexelsRectangle(objgl, tabIntNoTexture)
    obj3DRectangle.transformations = creerTransformations();
    obj3DRectangle.fltX = 1 * 0.2;
    obj3DRectangle.fltZ = 1 * 0.2;
    const transformations = obj3DRectangle.transformations
    //hauteur et échelle statique
    setPositionY(0.2, transformations);
    setEchellesXYZ([0.2, 0.2, 0.2], transformations);
    setPositionCoffre(17, 15.5, obj3DRectangle)
    return obj3DRectangle;
}
}
function creerRectangle(objgl) {
    var tabVertex = new Array();

    // Face avant pleine
    tabVertex[0] = [
        0.0, 0.0, 1.0, // Centre du plan 
        1.0, 2.0, 1.0,
        -1.0, 2.0, 1.0,
        -1.0, -2.0, 1.0,
        1.0, -2.0, 1.0,
        1.0, 2.0, 1.0
    ];

    // Face arrère pleine
    tabVertex[1] = [
        0.0, 0.0, -1.0, // Centre du plan
        1.0, 2.0, -1.0,
        -1.0, 2.0, -1.0,
        -1.0, -2.0, -1.0,
        1.0, -2.0, -1.0,
        1.0, 2.0, -1.0
    ];

    // Face du dessus pleine
    tabVertex[2] = [
        0.0, 2.0, 0.0, // Centre du plan
        1.0, 2.0, -1.0,
        1.0, 2.0, 1.0,
        -1.0, 2.0, 1.0,
        -1.0, 2.0, -1.0,
        1.0, 2.0, -1.0
    ];
    // Face du dessous pleine
    tabVertex[3] = [
        0.0, -2.0, 0.0, // Centre du plan
        1.0, -2.0, -1.0,
        1.0, -2.0, 1.0,
        -1.0, -2.0, 1.0,
        -1.0, -2.0, -1.0,
        1.0, -2.0, -1.0
    ];

    // Face droite pleine
    tabVertex[4] = [
        1.0, 0.0, 0.0, // Centre du plan
        1.0, 2.0, 1.0,
        1.0, -2.0, 1.0,
        1.0, -2.0, -1.0,
        1.0, 2.0, -1.0,
        1.0, 2.0, 1.0
    ];

    // Face gauche pleine
    tabVertex[5] = [
        -1.0, 0.0, 0.0, // Centre du plan
        -1.0, 2.0, 1.0,
        -1.0, -2.0, 1.0,
        -1.0, -2.0, -1.0,
        -1.0, 2.0, -1.0,
        -1.0, 2.0, 1.0
    ];

    // Création des tampons
    var tabObjCube = new Array();
    for (var i = 0; i < 6; i++) {
        tabObjCube[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCube[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);
        tabObjCube[i].typeDessin = objgl.TRIANGLE_FAN;
    }

    return tabObjCube;
}
function creerCouleursRectangle(objgl) {
    var tabCouleurs = new Array();

    // Couleurs face avant pleine
    tabCouleurs[0] = [1.0, 0.0, 0.0, 1.0]; // Blanc 
    for (var i = 1; i < 6; i++)
        tabCouleurs[0] = tabCouleurs[0].concat([1.0, 0.0, 0.0, 1.0]); // Rouge

    // Couleurs face arrière pleine
    tabCouleurs[1] = [0.0, 1.0, 0.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[1] = tabCouleurs[1].concat([0.0, 1.0, 0.0, 1.0]); // Vert

    //Couleurs face du dessus pleine
    tabCouleurs[2] = [0.0, 0.0, 1.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[2] = tabCouleurs[2].concat([0.0, 0.0, 1.0, 1.0]); // Bleu

    //Couleurs face du dessous pleine
    tabCouleurs[3] = [1.0, 0.0, 1.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[3] = tabCouleurs[3].concat([1.0, 0.0, 1.0, 1.0]); // Magenta

    //Couleurs face droite pleine
    tabCouleurs[4] = [1.0, 1.0, 0.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[4] = tabCouleurs[4].concat([1.0, 1.0, 0.0, 1.0]); //Cyan 

    //Couleurs face gauche pleine
    tabCouleurs[5] = [0.0, 1.0, 1.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[5] = tabCouleurs[5].concat([0.0, 1.0, 1.0, 1.0]); // Jaune

    // Création des tampons
    var tabObjCouleursCube = new Array();
    for (var i = 0; i < 6; i++) {
        tabObjCouleursCube[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursCube[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursCube;
}
function creerTexelsRectangle(objgl, intNoTexture) {
    const tabTexels = new Array();

    // Texels de la face avant
    tabTexels[0] = [
        0.5, 0.5,
        1.0, 0.0,
        0.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
        1.0, 0.0
    ];
    tabTexels[1] = tabTexels[0] //face arrière
    tabTexels[2] = tabTexels[0]; //face du dessus
    tabTexels[3] = tabTexels[0]; //face du dessous
    tabTexels[4] = tabTexels[0]; //face droite
    tabTexels[5] = tabTexels[0]; //face gauche

    const tabTexelsRectangle = new Array();
    for (let i = 0; i < 6; i++) {
        tabTexelsRectangle[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabTexelsRectangle[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);
        tabTexelsRectangle[i].intNoTexture = intNoTexture; tabTexelsRectangle[i].pcCouleurTexel = 1;
    }

    return tabTexelsRectangle;
}

function collisionRectangle(obj3DRectangle, intDirection, camera) {
    const fltPositionXRectangle = getPositionX(obj3DRectangle.transformations);
    const fltPositionZRectangle = getPositionZ(obj3DRectangle.transformations);
    fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
    fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
    const fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);

    fltXPrime = intDirection * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
    fltZPrime = intDirection * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

    // Positions de la caméra
    let fltXCamera = getPositionX(camera) + fltXPrime;
    let fltZCamera = getPositionZ(camera) + fltZPrime;

    const fltRectangleWidth = obj3DRectangle.fltX;
    const fltRectangleDepth = obj3DRectangle.fltZ;

    const binCollisionX = (fltXCamera > fltPositionXRectangle - fltRectangleWidth) && (fltXCamera < fltPositionXRectangle + fltRectangleWidth);
    const binCollisionZ = (fltZCamera > fltPositionZRectangle - fltRectangleDepth) && (fltZCamera < fltPositionZRectangle + fltRectangleDepth);

    return binCollisionX && binCollisionZ;
}