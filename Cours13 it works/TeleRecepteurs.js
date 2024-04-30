function creerObj3DTeleRecepteurs(objgl, intNoTexture) {
    const obj3DTeleR = new Object();
    obj3DTeleR.fltProfondeur = 0.4;
    obj3DTeleR.fltLargeur = 0.4;
    obj3DTeleR.fltHauteur = 1.0;

    obj3DTeleR.vertex = creerVertexTeleRecepteur(objgl, obj3DTeleR.fltLargeur, obj3DTeleR.fltProfondeur, obj3DTeleR.fltHauteur);
    obj3DTeleR.couleurs = creerCouleursTeleRecepteur(objgl, [1, 1, 1, 1]);
    obj3DTeleR.texels = creerTexelsTeleRecepteur(objgl, obj3DTeleR.fltLargeur, obj3DTeleR.fltHauteur, intNoTexture);
    obj3DTeleR.maillage = creerMaillageTeleRecepteur(objgl);
    obj3DTeleR.transformations = creerTransformations();
    obj3DTeleR.binVisible = true;
    return obj3DTeleR;
}

function creerVertexTeleRecepteur(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
        //1er Octogone haut
        fltLargeur, fltHauteur, fltProfondeur/2,   // 0
        fltProfondeur/2, fltHauteur, fltLargeur,   // 1
        -fltProfondeur/2, fltHauteur, fltLargeur,  // 2
        -fltLargeur, fltHauteur, fltProfondeur/2,  // 3
        -fltLargeur, fltHauteur, -fltProfondeur/2,  // 4
        -fltProfondeur/2, fltHauteur, -fltLargeur,  // 5
        fltProfondeur/2, fltHauteur, -fltLargeur,  // 6
        fltLargeur, fltHauteur, -fltProfondeur/2,  // 7
        0.0, fltHauteur , 0.0, //8: Centre

        //2eme Octogone haut
        fltLargeur, fltHauteur - fltHauteur/5, fltProfondeur/2, // 9
        fltProfondeur/2, fltHauteur - fltHauteur/5, fltLargeur, // 10
        -fltProfondeur/2, fltHauteur - fltHauteur/5, fltLargeur, // 11
        -fltLargeur, fltHauteur - fltHauteur/5, fltProfondeur/2, // 12
        -fltLargeur, fltHauteur - fltHauteur/5, -fltProfondeur/2, // 13
        -fltProfondeur/2, fltHauteur - fltHauteur/5, -fltLargeur, // 14
        fltProfondeur/2, fltHauteur - fltHauteur/5, -fltLargeur, // 15
        fltLargeur, fltHauteur - fltHauteur/5, -fltProfondeur/2, // 16
        0.0, fltHauteur - fltHauteur/5, 0.0, //17: Centre

        //Octogone bas
        fltLargeur, 0.01, fltProfondeur/2,   // 18
        fltProfondeur/2, 0.01, fltLargeur,   // 19
        -fltProfondeur/2, 0.01, fltLargeur,  // 20
        -fltLargeur, 0.01, fltProfondeur/2,  // 21
        -fltLargeur, 0.01, -fltProfondeur/2,  // 22
        -fltProfondeur/2, 0.01, -fltLargeur,  // 23
        fltProfondeur/2, 0.01, -fltLargeur,  // 24
        fltLargeur, 0.01, -fltProfondeur/2,  // 25
        0.0, 0.0, 0.0,    //26: Centre

        //Points haut pour panels
        fltLargeur/4*3, fltHauteur, -fltProfondeur/2,  //27
        fltLargeur/2, fltHauteur, -fltProfondeur/4*3,  //28
        -fltLargeur/2, fltHauteur, -fltProfondeur/4*3,  //29
        -fltLargeur/4*3, fltHauteur, -fltProfondeur/2,  //30
        -fltLargeur/4*3, fltHauteur, fltProfondeur/2,  //31
        -fltLargeur/2, fltHauteur, fltProfondeur/4*3,   //32
        fltLargeur/2, fltHauteur, fltProfondeur/4*3,   //33
        fltLargeur/4*3, fltHauteur, fltProfondeur/2,   //34

        //Points bas pour panels
        fltLargeur/4*3, 0.01, -fltProfondeur/2,   //35
        fltLargeur/2, 0.01, -fltProfondeur/4*3,  //36
        -fltLargeur/2, 0.01, -fltProfondeur/4*3,   //37
        -fltLargeur/4*3, 0.01, -fltProfondeur/2,   //38
        -fltLargeur/4*3, 0.01, fltProfondeur/2,   //39
        -fltLargeur/2, 0.01, fltProfondeur/4*3,   //40
        fltLargeur/2, 0.01, fltProfondeur/4*3,   //41
        fltLargeur/4*3, 0.01, fltProfondeur/2,   //42
    ];

    const objTeleR = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTeleR);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objTeleR;
}

function creerCouleursTeleRecepteur(objgl, tabCouleur) {
    tabCouleurs = [];
    for (let i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursTeleR = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTeleR);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursTeleR;
}

function creerTexelsTeleRecepteur(objgl, fltLargeur, fltHauteur, intNoTexture) {
    const tabTexels = [
        // Texels de la face avant
        0.0, 0.7,
        0.0, 0.7,
        0.0, 0.7,
        0.0, 0.7,
        0.0, 0.7,
        0.0, 0.7,
        0.0, 0.7,
        0.0, 0.7,
        0.0, 0.7,

        0.0, 0.5,
        0.0, 0.5,
        0.0, 0.5,
        0.0, 0.5,
        0.0, 0.5,
        0.0, 0.5,
        0.0, 0.5,
        0.0, 0.5,
        0.0, 0.5,

        0.0, 0.7,
        0.3, 1.0,
        0.7, 1.0,
        1.0, 0.7,
        1.0, 0.3,
        0.7, 0.0,
        0.3, 0.0,
        0.0, 0.3,
        0.5, 0.5,
    ];

    const objTexelsTeleR = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTeleR);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTeleR.intNoTexture = intNoTexture;
    objTexelsTeleR.pcCouleurTexel = 1.0;

    return objTexelsTeleR;
}


function creerMaillageTeleRecepteur(objgl) {
    const tabMaillage = [
        //1er Octogone du haut
        8, 0, 1,
        8, 1, 2,
        8, 2, 3,
        8, 3, 4,
        8, 4, 5,
        8, 5, 6,
        8, 6, 7,
        8, 7, 0,

        //2eme Octogone du haut
        17, 9, 10,
        17, 10, 11,
        17, 11, 12,
        17, 12, 13,
        17, 13, 14,
        17, 14, 15,
        17, 15, 16,
        17, 16, 9,

        //Faces relies les octogones du haut
        0, 9, 10,
        0, 1, 10,

        1, 10, 11,
        1, 2, 11,

        2, 11, 12,
        2, 3, 12,

        3, 12, 13,
        3, 4, 13,

        4, 13, 14,
        4, 5, 14,

        5, 14, 15,
        5, 6, 15,

        6, 15, 16,
        6, 7, 16,

        7, 9, 0,
        7, 9, 16,

        //Octogone du bas
        26, 18, 19,
        26, 19, 20,
        26, 20, 21,
        26, 21, 22,
        26, 22, 23,
        26, 23, 24,
        26, 24, 25,
        26, 25, 18,


        //Pannels
        27, 28, 35,
        35, 36, 28,
        29, 30, 37,
        37, 38, 30,
        31, 32, 39,
        39, 40, 32,
        33, 34, 41,
        41, 42, 34,

        //Lignes
        27, 35,
        28, 36,
        29, 37,
        30, 38,
        31, 39,
        32, 40,
        33, 41,
        34, 42,
    ];

    const objMaillageTeleR = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTeleR);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageTeleR.intNbTriangles = 48;
    // Le nombre de droites
    objMaillageTeleR.intNbDroites = 8;

    return objMaillageTeleR;
}


function setPositionTeleRecepteur(posX, posZ, obj3DTeleR) {
    const transformations = obj3DTeleR.transformations
    setPositionX(posX, transformations);
    setPositionZ(posZ, transformations);
}

function teleporterDuRecept(obj3DTeleR, objCamera, posX, posZ) {
    const transformations = obj3DTeleR.transformations
    if(getPositionX(transformations) <= getPositionCameraX(objCamera) + 0.25 &&
        getPositionX(transformations) >= getPositionCameraX(objCamera) - 0.25 &&
        getPositionZ(transformations) >= getPositionCameraZ(objCamera) - 0.25 &&
        getPositionZ(transformations) <= getPositionCameraZ(objCamera) + 0.25) {
        setPositionCameraX(posX, objCamera);
        setPositionCameraZ(posZ, objCamera);
    }
}

function randomisationPositionRecept(obj3DTeleR, tabCarte) {
    do {
        //Créer une position (x,z) entre (1-30, 1-30)
        ranX = Math.floor(Math.random() * 30) + 1;
        ranZ = Math.floor(Math.random() * 30) + 1;
        //Vérifier si la position est dans le vide
    } while (tabCarte[ranX][ranZ] != 'v');
    setPositionX(ranX, obj3DTeleR.transformations);
    setPositionZ(ranZ, obj3DTeleR.transformations);
    //Modifier la valeur de la case vide de 'v' à 'V'
    tabCarte[ranX][ranZ] = 'V';
}