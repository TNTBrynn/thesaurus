function creerObj3DRectangle(objgl, binDestructible, tabIntNoTexture) {
    var obj3DRectangle = new Object();
    obj3DRectangle.vertex = creerVertexRectangle(objgl);
    obj3DRectangle.couleurs = creerCouleursRectangle(objgl);
    obj3DRectangle.maillage = null;
    obj3DRectangle.texels = creerTexelsRectangle(objgl, tabIntNoTexture);
    obj3DRectangle.binDestructible = binDestructible; // Indique si l'objet peut être détruit par les ouvreurs de mur
    obj3DRectangle.transformations = creerTransformations();
    obj3DRectangle.fltX = 1 * 0.5;
    obj3DRectangle.fltZ = 1 * 0.5;
    //hauteur et échelle statique
    const transformations = obj3DRectangle.transformations
    setEchellesXYZ([0.5, 0.5, 0.5], transformations);
    setPositionY(1, transformations);
    // setPositionRectangle(20, 15.5, obj3DRectangle);

    return obj3DRectangle;
}
function setPositionRectangle(posX, posZ, obj3DRectangle) {
    const transformations = obj3DRectangle.transformations
    setPositionX(posX, transformations);
    setPositionZ(posZ, transformations);
}
function setOrientationRectangle(objgl, obj3DRectangle) {
    setAngleX(angle, obj3DRectangle.transformations);
}
function creerVertexRectangle(objgl) {
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

    // Face droite pleine
    tabVertex[3] = [
        1.0, 0.0, 0.0, // Centre du plan
        1.0, 2.0, 1.0,
        1.0, -2.0, 1.0,
        1.0, -2.0, -1.0,
        1.0, 2.0, -1.0,
        1.0, 2.0, 1.0
    ];

    // Face gauche pleine
    tabVertex[4] = [
        -1.0, 0.0, 0.0, // Centre du plan
        -1.0, 2.0, 1.0,
        -1.0, -2.0, 1.0,
        -1.0, -2.0, -1.0,
        -1.0, 2.0, -1.0,
        -1.0, 2.0, 1.0
    ];

    //la face du dessous à été retirée pour ne pas être visible et alléger le jeu

    // Création des tampons
    var tabObjCube = new Array();
    for (var i = 0; i < 5; i++) {
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

    // //Couleurs face du dessous pleine
    // tabCouleurs[3] = [1.0, 0.0, 1.0, 1.0]; // Blanc
    // for (var i = 1; i < 6; i++)
    //     tabCouleurs[3] = tabCouleurs[3].concat([1.0, 0.0, 1.0, 1.0]); // Magenta

    //Couleurs face droite pleine
    tabCouleurs[3] = [1.0, 1.0, 0.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[3] = tabCouleurs[3].concat([1.0, 1.0, 0.0, 1.0]); //Cyan 

    //Couleurs face gauche pleine
    tabCouleurs[4] = [0.0, 1.0, 1.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[4] = tabCouleurs[4].concat([0.0, 1.0, 1.0, 1.0]); // Jaune

    // Création des tampons
    var tabObjCouleursCube = new Array();
    for (var i = 0; i < 5; i++) {
        tabObjCouleursCube[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursCube[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursCube;
}

function creerTexelsRectangle(objgl, tabIntNoTexture) {
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
    // tabTexels[3] = tabTexels[0]; //face du dessous
    tabTexels[3] = tabTexels[0]; //face droite
    tabTexels[4] = tabTexels[0]; //face gauche

    const tabTexelsRectangle = new Array();
    for (let i = 0; i < 6; i++) {
        tabTexelsRectangle[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabTexelsRectangle[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);
        if (i >= 0 && i <= 2) { //face avant, arrière, dessus, dessous
            tabTexelsRectangle[i].intNoTexture = tabIntNoTexture[0]; tabTexelsRectangle[i].pcCouleurTexel = 1;
        }
        else { //face droite, gauche
            tabTexelsRectangle[i].intNoTexture = tabIntNoTexture[1]; tabTexelsRectangle[i].pcCouleurTexel = 1;
        }
    }

    return tabTexelsRectangle;
}
function collisionRectangle(obj3DRectangle, intDirection, camera) {
    const fltPositionXRectangle = getPositionX(obj3DRectangle.transformations);
    const fltPositionZRectangle = getPositionZ(obj3DRectangle.transformations);
    fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
    fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
        const fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);

        fltXPrime = intDirection * 0.5 * Math.cos(Math.acos(fltX / fltRayon));
        fltZPrime = intDirection * 0.5 * Math.sin(Math.asin(fltZ / fltRayon));

        // Positions de la caméra
        let fltXCamera = getPositionX(camera) + fltXPrime;
        let fltZCamera = getPositionZ(camera) + fltZPrime;

        const fltRectangleWidth = obj3DRectangle.fltX;
        const fltRectangleDepth = obj3DRectangle.fltZ;

        console.log(fltXCamera, '>', fltPositionXRectangle - fltRectangleWidth)
        const binCollisionX = (fltXCamera > fltPositionXRectangle - fltRectangleWidth) && (fltXCamera < fltPositionXRectangle + fltRectangleWidth);
        const binCollisionZ = (fltZCamera > fltPositionZRectangle - fltRectangleDepth) && (fltZCamera < fltPositionZRectangle + fltRectangleDepth);
        //aucune collision retourne false;
        return binCollisionX && binCollisionZ;
}