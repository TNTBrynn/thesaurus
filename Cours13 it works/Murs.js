function creerObj3DMur(objgl, tabIntNoTexture) {
    var obj3DMur = new Object();
    obj3DMur.vertex = creerVertexMur(objgl);
    obj3DMur.couleurs = creerCouleursMur(objgl);
    obj3DMur.maillage = creerMaillageMur(objgl);
    obj3DMur.texels = creerTexelsMur(objgl, tabIntNoTexture);
    obj3DMur.binVisible = true;
    obj3DMur.binBriser = false;
    obj3DMur.transformations = creerTransformations();
    obj3DMur.fltX = 1 * 0.5;
    obj3DMur.fltZ = 1 * 0.5;
    obj3DMur.lettre = 'd';
    obj3DMur.nom = 'mur';
    //hauteur et échelle statique
    const transformations = obj3DMur.transformations
    setEchellesXYZ([0.5, 0.5, 0.5], transformations);
    setPositionY(1, transformations);
    // setPositionMur(20, 15.5, obj3DMur);

    return obj3DMur;
}
function ouvrirMur(obj3DMur) {
    obj3DMur.binBriser = true;
    obj3DMur.binVisible = false;
}

function fermerMur(obj3DMur) {
    obj3DMur.binBriser = false;
    obj3DMur.binVisible = true;
}

function setPositionMur(posX, posZ, obj3DMur) {
    const transformations = obj3DMur.transformations
    setPositionX(posX, transformations);
    setPositionZ(posZ, transformations);
}
function setOrientationMur(obj3DMur) {
    setAngleX(angle, obj3DMur.transformations);
}

function creerVertexMur(objgl) {
    const objMur = objgl.createBuffer();

    const tabVertex = [
        // Face avant (Z=1)
        0.0, 0.0, 1.0,   // 0: Centre
        1.0, 4.0, 1.0,   // 1: Coin haut droit
        1.0, -4.0, 1.0,  // 2: Coin bas droit
        -1.0, -4.0, 1.0,  // 3: Coin bas gauche
        -1.0, 4.0, 1.0,  // 4: Coin haut gauche

        // Face arrière (Z=-1) 
        0.0, 0.0, -1.0,   // 5: Centre
        1.0, 4.0, -1.0,   // 6: Coin haut droit
        1.0, -4.0, -1.0,  // 7: Coin bas droit
        -1.0, -4.0, -1.0,  // 8: Coin bas gauche
        -1.0, 4.0, -1.0,  // 9: Coin haut gauche

        //Face droite (X=1)
        1.0, 0.0, 0.0, // 10: Centre droit
        //Face gauche (X=-1)
        -1.0, 0.0, 0.0, // 11: Centre gauche
        //Face dessus (Y=1)
        0.0, 4.0, 0.0, // 12: Centre haut
        //Face dessous (Y=-1)
        // 0.0, -2.0, 0.0, // 13: Centre bas
    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objMur;
}

function creerCouleursMur(objgl) {
    const objCouleursMur = objgl.createBuffer();

    // Face avant
    tabCouleurs = [1.0, 1.0, 1.0, 1.0]; // Blanc 
    for (let i = 1; i <= 4; i++)
        tabCouleurs = tabCouleurs.concat([1.0, 0.0, 0.0, 1.0]); // Rouge

    // Face arrière
    tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]); // Blanc 
    for (let i = 1; i <= 4; i++)
        tabCouleurs = tabCouleurs.concat([0.0, 1.0, 0.0, 1.0]); // Vert

    // Face droite
    tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]); // Blanc
    for (let i = 1; i <= 4; i++)
        tabCouleurs = tabCouleurs.concat([0.0, 0.0, 1.0, 1.0]); // Bleu

    // Face gauche
    tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]); // Blanc
    for (let i = 1; i <= 4; i++)
        tabCouleurs = tabCouleurs.concat([1.0, 1.0, 0.0, 1.0]); // Jaune

    // Face dessus
    tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]); // Blanc
    for (let i = 1; i <= 4; i++)
        tabCouleurs = tabCouleurs.concat([1.0, 0.0, 1.0, 1.0]); // Magenta

    //  // Face dessous
    //  tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]); // Blanc
    //  for (let i = 1; i <= 4; i++)
    //      tabCouleurs = tabCouleurs.concat([0.0, 1.0, 1.0, 1.0]); // Cyan

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursMur;
}

// Relier un texel à un vertex
function creerTexelsMur(objgl, tabIntNoTexture) {
    const objTexelsMur = objgl.createBuffer();

    const tabTexelsMur = [
        // Texels de la face avant
        0.5, 0.5,  // 0: Centre
        1.0, 0.0,  // 1: Coin haut droit
        1.0, 1.0,  // 2: Coin bas droit
        0.0, 1.0,  // 3: Coin bas gauche
        0.0, 0.0,  // 4: Coin haut gauche

        // Texels de la face arrière
        0.5, 0.5,   // 5: Centre
        0.0, 0.0,   // 6: Coin haut droit
        0.0, 1.0,   // 7: Coin bas droit
        1.0, 1.0,   // 8: Coin bas gauche
        1.0, 0.0,    // 9: Coin haut gauche

        // Texels de la face droite
        0.5, 0.5,   // 10: Centre
        // Texels de la face gauche
        0.5, 0.5,   // 11: Centre
        // Texels de la face dessus
        0.5, 0.5,   // 12: Centre
        // // Texels de la face dessous
        // 0.5, 0.5,   // 13: Centre
    ];
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexelsMur), objgl.STATIC_DRAW);
    objTexelsMur.intNoTexture = tabIntNoTexture[0]; objTexelsMur.pcCouleurTexel = 1;
    
    return objTexelsMur;
}

function creerTexelsMur1(objgl, tabIntNoTexture) {
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

    const tabTexelsMur = new Array();
    for (let i = 0; i < 5; i++) {
        tabTexelsMur[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabTexelsMur[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);
        if (i >= 0 && i <= 2) { //face avant, arrière, dessus, dessous
            tabTexelsMur[i].intNoTexture = tabIntNoTexture[0]; tabTexelsMur[i].pcCouleurTexel = 1;
        }
        else { //face droite, gauche
            tabTexelsMur[i].intNoTexture = tabIntNoTexture[1]; tabTexelsMur[i].pcCouleurTexel = 1;
        }
    }

    return tabTexelsMur;
}

// Le maillage 
function creerMaillageMur(objgl) {
    const objMaillageMur = objgl.createBuffer();
    // Le maillage                        
    const tabMaillageMur =
        [ // Les 4 triangles de la face avant
            0, 1, 2,
            0, 2, 3,
            0, 3, 4,
            0, 4, 1,
            // Les 4 triangles de la face arrière
            5, 6, 7,
            5, 7, 8,
            5, 8, 9,
            5, 9, 6,
            // Les 4 triangles de la face droite
            1, 10, 2,
            2, 10, 7,
            7, 10, 6,
            6, 10, 1,
            // Les 4 triangles de la face gauche
            3, 11, 4,
            4, 11, 9,
            9, 11, 8,
            8, 11, 3,
            // Les 4 triangles de la face dessus
            1, 12, 4,
            4, 12, 9,
            9, 12, 6,
            6, 12, 1,
            // // Les 4 triangles de la face dessous
            // 3,13,2,
            // 2,13,7,
            // 7,13,8,
            // 8,13,3,
        ];

    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMur);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageMur), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageMur.intNbTriangles = 20;
    // Le nombre de droites
    objMaillageMur.intNbDroites = 0;

    return objMaillageMur;
}
function collisionMur(obj3DMur, intDirection, camera) {
    const fltPositionXMur = getPositionX(obj3DMur.transformations);
    const fltPositionZMur = getPositionZ(obj3DMur.transformations);
    fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
    fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
    const fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);

    fltXPrime = intDirection * 0.5 * Math.cos(Math.acos(fltX / fltRayon));
    fltZPrime = intDirection * 0.5 * Math.sin(Math.asin(fltZ / fltRayon));

    // Positions de la caméra
    let fltXCamera = getPositionX(camera) + fltXPrime;
    let fltZCamera = getPositionZ(camera) + fltZPrime;

    const fltMurWidth = obj3DMur.fltX;
    const fltMurDepth = obj3DMur.fltZ;

    const binCollisionX = (fltXCamera > fltPositionXMur - fltMurWidth) && (fltXCamera < fltPositionXMur + fltMurWidth);
    const binCollisionZ = (fltZCamera > fltPositionZMur - fltMurDepth) && (fltZCamera < fltPositionZMur + fltMurDepth);
    //console.log(fltXCamera, '>', fltPositionXMur - fltMurWidth, fltXCamera, '<', fltPositionXMur + fltMurWidth, binCollisionX)
    //console.log(fltZCamera, '>', fltPositionZMur - fltMurDepth, fltZCamera, '<', fltPositionZMur + fltMurDepth, binCollisionZ)
    //console.log(binCollisionX, binCollisionZ)

    //aucune collision retourne false;
    return binCollisionX && binCollisionZ;
}