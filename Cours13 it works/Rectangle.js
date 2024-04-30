function creerObj3DRectangle(objgl, binDestructible, tabIntNoTexture) {
    var obj3DRectangle = new Object();
    obj3DRectangle.vertex = creerVertexRectangle(objgl);
    obj3DRectangle.couleurs = creerCouleursRectangle(objgl);
    obj3DRectangle.maillage = creerMaillageRectangle(objgl);
    obj3DRectangle.texels = creerTexelsRectangle(objgl, tabIntNoTexture);
    obj3DRectangle.binDestructible = binDestructible; // Indique si l'objet peut être détruit par les ouvreurs de mur
    obj3DRectangle.binVisible = true;
    obj3DRectangle.binBriser = false;
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
function ouvrirMur(obj3DRectangle) {
    obj3DRectangle.binBriser = true;
    obj3DRectangle.binVisible = false;
}

function fermerMur(obj3DRectangle) {
    obj3DRectangle.binBriser = false;
    obj3DRectangle.binVisible = true;
}

function setPositionRectangle(posX, posZ, obj3DRectangle) {
    const transformations = obj3DRectangle.transformations
    setPositionX(posX, transformations);
    setPositionZ(posZ, transformations);
}
function setOrientationRectangle(obj3DRectangle) {
    setAngleX(angle, obj3DRectangle.transformations);
}

function creerVertexRectangle(objgl) {
    const objRectangle = objgl.createBuffer();

    const tabVertex = [
        // Face avant (Z=1)
        0.0, 0.0, 1.0,   // 0: Centre
        1.0, 2.0, 1.0,   // 1: Coin haut droit
        1.0, -2.0, 1.0,  // 2: Coin bas droit
        -1.0, -2.0, 1.0,  // 3: Coin bas gauche
        -1.0, 2.0, 1.0,  // 4: Coin haut gauche

        // Face arrière (Z=-1) 
        0.0, 0.0, -1.0,   // 5: Centre
        1.0, 2.0, -1.0,   // 6: Coin haut droit
        1.0, -2.0, -1.0,  // 7: Coin bas droit
        -1.0, -2.0, -1.0,  // 8: Coin bas gauche
        -1.0, 2.0, -1.0,  // 9: Coin haut gauche

        //Face droite (X=1)
        1.0, 0.0, 0.0, // 10: Centre droit
        //Face gauche (X=-1)
        -1.0, 0.0, 0.0, // 11: Centre gauche
        //Face dessus (Y=1)
        0.0, 2.0, 0.0, // 12: Centre haut
        //Face dessous (Y=-1)
        // 0.0, -2.0, 0.0, // 13: Centre bas
    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objRectangle);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objRectangle;
}

function creerCouleursRectangle(objgl) {
    const objCouleursRectangle = objgl.createBuffer();

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

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursRectangle);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursRectangle;
}

// Relier un texel à un vertex
function creerTexelsRectangle(objgl, tabIntNoTexture) {
    const objTexelsRectangle = objgl.createBuffer();

    const tabTexelsRectangle = [
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
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsRectangle);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexelsRectangle), objgl.STATIC_DRAW);
    objTexelsRectangle.intNoTexture = tabIntNoTexture[0]; objTexelsRectangle.pcCouleurTexel = 1;


    // for (let i = 0; i < 5; i++) {
    //     objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsRectangle);
    //     objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexelsRectangle), objgl.STATIC_DRAW);

    //     if (i >= 0 && i <= 2) { //face avant, arrière, dessus, dessous
    //         tabTexelsRectangle[i].intNoTexture = tabIntNoTexture[0]; tabTexelsRectangle[i].pcCouleurTexel = 1;
    //     }
    //     else { //face droite, gauche
    //         tabTexelsRectangle[i].intNoTexture = tabIntNoTexture[1]; tabTexelsRectangle[i].pcCouleurTexel = 1;
    //     }
    // }

    return objTexelsRectangle;
}

function creerTexelsRectangle1(objgl, tabIntNoTexture) {
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
    for (let i = 0; i < 5; i++) {
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

// Le maillage 
function creerMaillageRectangle(objgl) {
    const objMaillageRectangle = objgl.createBuffer();
    // Le maillage                        
    const tabMaillageRectangle =
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

    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageRectangle);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageRectangle), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageRectangle.intNbTriangles = 20;
    // Le nombre de droites
    objMaillageRectangle.intNbDroites = 0;

    return objMaillageRectangle;
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

    const binCollisionX = (fltXCamera > fltPositionXRectangle - fltRectangleWidth) && (fltXCamera < fltPositionXRectangle + fltRectangleWidth);
    const binCollisionZ = (fltZCamera > fltPositionZRectangle - fltRectangleDepth) && (fltZCamera < fltPositionZRectangle + fltRectangleDepth);
    //console.log(fltXCamera, '>', fltPositionXRectangle - fltRectangleWidth, fltXCamera, '<', fltPositionXRectangle + fltRectangleWidth, binCollisionX)
    //console.log(fltZCamera, '>', fltPositionZRectangle - fltRectangleDepth, fltZCamera, '<', fltPositionZRectangle + fltRectangleDepth, binCollisionZ)
    //aucune collision retourne false;
    return binCollisionX && binCollisionZ;
}