function creerObj3DJoueur(objgl, intNoTexture) {
    const obj3DJoueur = new Object();
    obj3DJoueur.vertex = creerVertexJoueur(objgl);
    obj3DJoueur.couleurs = creerCouleursJoueur(objgl, [1, 1, 1, 1]);
    obj3DJoueur.maillage = null
    obj3DJoueur.texels = creerTexelsJoueur(objgl, intNoTexture)
    obj3DJoueur.maillage = creerMaillageJoueur(objgl);
    obj3DJoueur.transformations = creerTransformations();
    obj3DJoueur.fltX = 1 * 0.4;
    obj3DJoueur.fltZ = 1 * 0.4;
    const transformations = obj3DJoueur.transformations
    //hauteur et échelle statique
    setPositionY(0.2, transformations);
    setEchellesXYZ([0.4, 0.4, 0.4], transformations);
    setPositionJoueur(15, 10, obj3DJoueur)
    return obj3DJoueur;
}

function setPositionJoueur(posX, posZ, obj3DJoueur) {
    const transformations = obj3DJoueur.transformations
    setPositionX(posX, transformations);
    setPositionZ(posZ, transformations);
    setPositionY(5, transformations);
}

function setCibleJoueur(cibleX, cibleZ, obj3DJoueur) {
    const transformations = obj3DJoueur.transformations
    const posX = getPositionX(transformations);
    const posZ = getPositionZ(transformations);
    const directionX = cibleX - posX;
    const directionZ = cibleZ - posZ;

    // Calculate the angle based on the direction the camera is facing
    const angleY = Math.atan2(directionX, directionZ);

    // Convert the angle from radians to degrees
    const angleYInDegrees = angleY * (180 / Math.PI);

    // Set the Y angle of the player
    setAngleY(angleYInDegrees-45, obj3DJoueur.transformations);
}


function creerVertexJoueur(objgl) {
    const tabVertex = [
        1.0, 5.0, 1.0, // Top left corner
        0, 5.0, 0.5, // Top right corner
        0.5, 5.0, 0, // Bottom left corner
        0, 5.0, 0 // Bottom right corner
    ];

    const objJoueur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objJoueur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objJoueur;
}

function creerCouleursJoueur(objgl, tabCouleur) {
    let tabCouleurs = [];
    for (let i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursJoueur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursJoueur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursJoueur;
}

function creerTexelsJoueur(objgl, intNoTexture) {
    const tabTexels = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        1.0, 1.0
    ];

    const objTexelsJoueur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsJoueur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsJoueur.intNoTexture = intNoTexture; objTexelsJoueur.pcCouleurTexel = 1.0;

    return objTexelsJoueur;
}

function creerMaillageJoueur(objgl) {

    const tabMaillage =
        [ // Les 2 triangles du Joueur
            0, 1, 2,
            1, 2, 3,
        ];

    const objMaillageJoueur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageJoueur);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageJoueur.intNbTriangles = 2;
    // Le nombre de droites
    objMaillageJoueur.intNbDroites = 0;

    return objMaillageJoueur;
}

