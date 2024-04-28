//Fleche.js

function creerObj3DFleche(objgl, intNoTexture) {
    // Créer 1 Fleche
    const obj3DFleche = new Object();
    obj3DFleche.vertex = creerVertexFleche(objgl);
    obj3DFleche.couleurs = creerCouleursFleche(objgl);
    obj3DFleche.maillage = creerMaillageFleche(objgl);
    obj3DFleche.texels = creerTexelsFleche(objgl, intNoTexture);
    obj3DFleche.transformations = creerTransformations();
    const transformations = obj3DFleche.transformations
    //hauteur, orientation en x, et echelle statique
    setPositionY(1, transformations);
    // setAngleX(90, transformations);
    setEchellesXYZ([0.1, 0.1, 0.1], transformations);

    return obj3DFleche;
}
function creerVertexFleche(objgl) {
    const objFleche = objgl.createBuffer();

    const tabVertex = [
        // Face avant (Z=1)
        0.0, 0.0, 1.0,   // 0: Centre
        1.0, 1.0, 1.0,   // 1: Coin haut droit
        1.0, -1.0, 1.0,  // 2: Coin bas droit //
        -1.0, -1.0, 1.0,  // 3: Coin bas gauche //
        -1.0, 1.0, 1.0,  // 4: Coin haut gauche

        // Face arrière (Z=-1) 
        0.0, 0.0, -1.0,   // 5: Centre
        1.0, 1.0, -1.0,   // 6: Coin haut droit
        1.0, -1.0, -1.0,  // 7: Coin bas droit //
        -1.0, -1.0, -1.0,  // 8: Coin bas gauche //
        -1.0, 1.0, -1.0,  // 9: Coin haut gauche

        //Face droite (X=1)
        1.0, 0.0, 0.0, // 10: Centre droit
        //Face gauche (X=-1)
        -1.0, 0.0, 0.0, // 11: Centre gauche
        //Face dessus (Y=1)
        0.0, 3.0, 0.0, // 12: Centre haut //
        //Face dessous (Y=-1)
        0.0, -1.0, 0.0, // 13: Centre bas //
    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objFleche;
}

function creerCouleursFleche(objgl) {
    const objCouleursFleche = objgl.createBuffer();

    // Face avant
    tabCouleurs = [1.0, 1.0, 0.0, 1.0]
    for (let i = 1; i <= 8; i++)
        tabCouleurs = tabCouleurs.concat([1.0, 1.0, 0.0, 1.0]); // Jaune

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursFleche;
}

function creerMaillageFleche(objgl) {
    const objMaillageFleche = objgl.createBuffer();
    // Le maillage                        
    const tabMaillageFleche =
        [
            //Triangle de la face avant
            3, 12, 2,
            //Triangle de la face arrière
            8, 12, 7,
            //Triangle de la face droite
            2, 12, 7,
            //Triangle de la face gauche
            8, 12, 3,
            // Les 4 triangles de la face dessous
            3, 13, 2,
            2, 13, 7,
            7, 13, 8,
            8, 13, 3,

        ];

    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageFleche);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageFleche), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageFleche.intNbTriangles = 8;
    // Le nombre de droites
    objMaillageFleche.intNbDroites = 0;

    return objMaillageFleche;
}
//texels pour la texture
function creerTexelsFleche(objgl, intNoTexture) {
    const objTexelsFleche = objgl.createBuffer();

    const tabTexels = [
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
        // Texels de la face dessous
        0.5, 0.5,   // 13: Centre
    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    objTexelsFleche.intNoTexture = intNoTexture; objTexelsFleche.pcCouleurTexel = 1.00;
    return objTexelsFleche;
}
function setPositionFleche(posX, posZ, obj3DFleche) {
    const transformations = obj3DFleche.transformations
    setPositionX(posX, transformations);
    setPositionZ(posZ, transformations);
}
function setDirectionFleche(angle, obj3DFleche) {
    const transformations = obj3DFleche.transformations
    setAngleX(270, transformations);
    setAngleZ(angle, transformations);
}
//Trouver et pointe vers le coffre
function trouverCoffre(obj3DFleche, tresor) {
    const transformations = obj3DFleche.transformations
    const transformationsTresor = tresor.transformations
    let posTresorX = getPositionX(transformationsTresor);
    let posTresorZ = getPositionZ(transformationsTresor);
    let posFlecheX = getPositionX(transformations)
    let posFlecheZ = getPositionZ(transformations)

    let angle = Math.atan2(posFlecheX - posTresorX, posFlecheZ - posTresorZ) * 180 / Math.PI;
    setDirectionFleche(angle, obj3DFleche)
}

function randomisationPositionFleche(obj3DFleche, tabCarte) {
    do {
        //Créer une position (x,z) entre (1-30, 1-30)
        ranX = Math.floor(Math.random() * 30) + 1;
        ranZ = Math.floor(Math.random() * 30) + 1;
        //Vérifier si la position est dans le vide
    } while (tabCarte[ranX][ranZ] != 'v');
    //Appliquer cette position dans setPositionFleche()
    setPositionFleche(ranX, ranZ, obj3DFleche);
}