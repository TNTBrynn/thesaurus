function creerObj3DTresor(objgl, tabIntNoTexture) {
    const obj3DTresor = new Object();
    obj3DTresor.vertex = creerVertexTresor(objgl);
    obj3DTresor.couleurs = creerCouleursTresor(objgl);
    obj3DTresor.maillage = null
    obj3DTresor.texels = creerTexelsTresor(objgl, tabIntNoTexture)
    obj3DTresor.transformations = creerTransformations();
    obj3DTresor.fltX = 1 * 0.2;
    obj3DTresor.fltZ = 1 * 0.2;
    const transformations = obj3DTresor.transformations
    //hauteur et échelle statique
    setPositionY(0.2, transformations);
    setEchellesXYZ([0.2, 0.2, 0.2], transformations);
    setPositionCoffre(10, 10, obj3DTresor)
    return obj3DTresor;
}

function setPositionCoffre(posX, posZ, obj3DTresor) {
    const transformations = obj3DTresor.transformations
    setPositionX(posX, transformations);
    setPositionZ(posZ, transformations);
}
function setOrientationCoffre(angle, obj3DTresor) {
    setAngleX(angle, obj3DTresor.transformations);
}

function creerVertexTresor(objgl) {
    var tabVertex = new Array();

    // Face avant pleine
    tabVertex[0] = [
        0.0, 0.0, 1.0, // Centre du plan 
        1.0, 0.7, 1.0,
        -1.0, 0.7, 1.0,
        -1.0, -0.7, 1.0,
        1.0, -0.7, 1.0,
        1.0, 0.7, 1.0,
    ];

    //Face avant haut
    tabVertex[6] = [
        0.0, 0.85, 0.85,
        1.0, 0.7, 1.0,
        -1.0, 0.7, 1.0,
        -1.0, 1.0, 0.7,
        1.0, 1.0, 0.7,
        1.0, 0.7, 1.0
    ]
    //face avant bas
    tabVertex[7] = [
        0.0, -0.85, 0.85,
        1.0, -0.7, 1.0,
        -1.0, -0.7, 1.0,
        -1.0, -1.0, 0.7,
        1.0, -1.0, 0.7,
        1.0, -0.7, 1.0
    ]

    // Face arrère pleine
    tabVertex[1] = [
        0.0, 0.0, -1.0, // Centre du plan 
        1.0, -0.7, -1.0,
        1.0, 0.7, -1.0,
        -1.0, 0.7, -1.0,
        -1.0, -0.7, -1.0,
        1.0, -0.7, -1.0
    ];

    //Face arrière haute
    tabVertex[8] = [
        0.0, 0.85, -0.85,
        1.0, 0.7, -1.0,
        -1.0, 0.7, -1.0,
        -1.0, 1.0, -0.7,
        1.0, 1.0, -0.7,
        1.0, 0.7, -1.0
    ]

    //face arrière basse
    tabVertex[9] = [
        0.0, -0.85, -0.85,
        1.0, -0.7, -1.0,
        -1.0, -0.7, -1.0,
        -1.0, -1.0, -0.7,
        1.0, -1.0, -0.7,
        1.0, -0.7, -1.0
    ]

    // Face du dessus pleine
    tabVertex[2] = [
        0.0, 1.0, 0.0, // Centre du plan
        1.0, 1.0, -0.7,
        1.0, 1.0, 0.7,
        -1.0, 1.0, 0.7,
        -1.0, 1.0, -0.7,
        1.0, 1.0, -0.7
    ];
    // Face du dessous pleine
    tabVertex[3] = [
        0.0, -1.0, 0.0, // Centre du plan
        1.0, -1.0, -0.7,
        1.0, -1.0, 0.7,
        -1.0, -1.0, 0.7,
        -1.0, -1.0, -0.7,
        1.0, -1.0, -0.7
    ];

    // Face droite pleine
    tabVertex[4] = [
        1.0, 0.0, 0.0, // Centre du plan
        1.0, -1.0, -0.7,
        1.0, -0.7, -1.0,
        1.0, 0.7, -1.0,
        1.0, 1.0, -0.7,
        1.0, 1.0, 0.7,//face avant
        1.0, 0.7, 1.0, //face avant
        1.0, -0.7, 1.0, //face avant
        1.0, -1.0, 0.7, //face avant
        1.0, -1.0, -0.7
    ];

    // Face gauche pleine
    tabVertex[5] = [
        -1.0, 0.0, 0.0, // Centre du plan
        -1.0, 1.0, 0.7, //face avant
        -1.0, 0.7, 1.0, //face avant
        -1.0, -0.7, 1.0, //face avant
        -1.0, -1.0, 0.7, //face avant
        -1.0, -1.0, -0.7,
        -1.0, -0.7, -1.0,
        -1.0, 0.7, -1.0,
        -1.0, 1.0, -0.7,
        -1.0, 1.0, 0.7
    ];

    // Création des tampons
    var tabObjTresor = new Array();
    for (var i = 0; i < 10; i++) {
        tabObjTresor[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjTresor[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);
        tabObjTresor[i].typeDessin = objgl.TRIANGLE_FAN;
        // tabObjTresor[i].typeDessin = objgl.LINE_LOOP;
    }

    return tabObjTresor;
}

function creerCouleursTresor(objgl) {
    var tabCouleurs = new Array();

    // Couleurs face avant pleine
    tabCouleurs[0] = [1.0, 0.0, 0.0, 1.0];
    for (var i = 1; i < 10; i++)
        tabCouleurs[0] = tabCouleurs[0].concat([1.0, 0.0, 0.0, 1.0]); // Rouge

    // Couleurs face arrière pleine
    tabCouleurs[1] = [0.0, 1.0, 0.0, 1.0];
    for (var i = 1; i < 10; i++)
        tabCouleurs[1] = tabCouleurs[1].concat([0.0, 1.0, 0.0, 1.0]); // Vert

    //Couleurs face du dessus pleine
    tabCouleurs[2] = [0.0, 0.0, 1.0, 1.0];
    for (var i = 1; i < 10; i++)
        tabCouleurs[2] = tabCouleurs[2].concat([0.0, 0.0, 1.0, 1.0]); // Bleu

    //Couleurs face du dessous pleine
    tabCouleurs[3] = [1.0, 0.0, 1.0, 1.0];
    for (var i = 1; i < 10; i++)
        tabCouleurs[3] = tabCouleurs[3].concat([1.0, 0.0, 1.0, 1.0]); // Magenta

    //Couleurs face droite pleine
    tabCouleurs[4] = [1.0, 1.0, 0.0, 1.0];
    for (var i = 1; i < 10; i++)
        tabCouleurs[4] = tabCouleurs[4].concat([1.0, 1.0, 0.0, 1.0]); //Cyan 

    //Couleurs face gauche pleine
    tabCouleurs[5] = [0.0, 1.0, 1.0, 1.0];
    for (var i = 1; i < 10; i++)
        tabCouleurs[5] = tabCouleurs[5].concat([0.0, 1.0, 1.0, 1.0]); // Jaune

    // Couleurs face avant haute
    tabCouleurs[6] = [0.0, 1.0, 0.5, 1.0];
    for (var i = 1; i < 6; i++)
        tabCouleurs[6] = tabCouleurs[6].concat([0.0, 1.0, 0.5, 1.0]); // Turquoise

    //Couleur face avant basse
    tabCouleurs[7] = [0.5, 0.0, 1.0, 1.0];
    for (var i = 1; i < 6; i++)
        tabCouleurs[7] = tabCouleurs[7].concat([0.5, 0.0, 1.0, 1.0]); // Mauve

    //Couleurs face arrière haute
    tabCouleurs[8] = [1.0, 0.0, 0.5, 1.0];
    for (var i = 1; i < 6; i++)
        tabCouleurs[8] = tabCouleurs[8].concat([1.0, 0.0, 0.5, 1.0]); // Rose

    //Couleur face arrière basse
    tabCouleurs[9] = [1.0, 0.5, 0.0, 1.0];
    for (var i = 1; i < 6; i++)
        tabCouleurs[9] = tabCouleurs[9].concat([1.0, 0.5, 0.0, 1.0]); // Orange

    // Création des tampons
    var tabObjCouleursTresor = new Array();
    for (var i = 0; i < 10; i++) {
        tabObjCouleursTresor[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursTresor[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursTresor;
}
function creerTexelsTresor(objgl, tabIntNoTexture) {
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
    tabTexels[4] = [
        0.5, 0.5,
        1.0, 0.0,
        0.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
        1.0, 0.0
    ];

    tabTexels[5] = tabTexels[0]; //face gauche
    tabTexels[6] = tabTexels[0]; //face avant haute
    tabTexels[7] = tabTexels[0]; //face avant basse
    tabTexels[8] = tabTexels[0]; //face arrière haute
    tabTexels[9] = tabTexels[0]; //face arrière basse

    const tabTexelsTresor = new Array();
    for (let i = 0; i < 10; i++) {
        tabTexelsTresor[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabTexelsTresor[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);
        if (i == 0) { //face avant
            tabTexelsTresor[i].intNoTexture = tabIntNoTexture[1]; tabTexelsTresor[i].pcCouleurTexel = 1;
        }
        else if (i == 1) { //face arrière
            tabTexelsTresor[i].intNoTexture = tabIntNoTexture[4]; tabTexelsTresor[i].pcCouleurTexel = 1;
        }
        else if (i == 2) { //face du dessus
            tabTexelsTresor[i].intNoTexture = tabIntNoTexture[5]; tabTexelsTresor[i].pcCouleurTexel = 1;
        }
        else if (i == 4) { //droite
            tabTexelsTresor[i].intNoTexture = tabIntNoTexture[0]; tabTexelsTresor[i].pcCouleurTexel = 1;
        }
        else if (i == 5) { //gauche
            tabTexelsTresor[i].intNoTexture = tabIntNoTexture[0]; tabTexelsTresor[i].pcCouleurTexel = 1;
        }
        else if (i == 6) { //face avant haute
            tabTexelsTresor[i].intNoTexture = tabIntNoTexture[2]; tabTexelsTresor[i].pcCouleurTexel = 1;
        }
        else if (i == 7) { //face avant basse
            tabTexelsTresor[i].intNoTexture = tabIntNoTexture[3]; tabTexelsTresor[i].pcCouleurTexel = 1;
        }
        else if (i == 8) { //face arrière haute
            tabTexelsTresor[i].intNoTexture = tabIntNoTexture[3]; tabTexelsTresor[i].pcCouleurTexel = 1;
        }
        else if (i == 9) { //face arrière basse
            tabTexelsTresor[i].intNoTexture = tabIntNoTexture[3]; tabTexelsTresor[i].pcCouleurTexel = 1;
        }
        else {
            tabTexelsTresor[i].intNoTexture = 0; tabTexelsTresor[i].pcCouleurTexel = 0;
        }
    }

    return tabTexelsTresor;
}
//quand la caméra entre en collision avec le trésor on change de niveau
function collisionTresor(obj3DTresor, intDirection, camera) {
    const fltPositionXTresor = getPositionX(obj3DTresor.transformations);
    const fltPositionZTresor = getPositionZ(obj3DTresor.transformations);
    fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
    fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
    const fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);

    fltXPrime = intDirection * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
    fltZPrime = intDirection * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

    // Positions de la caméra
    let fltXCamera = getPositionX(camera) + fltXPrime;
    let fltZCamera = getPositionZ(camera) + fltZPrime;

    const fltTresorWidth = obj3DTresor.fltX;
    const fltTresorDepth = obj3DTresor.fltZ;

    const binCollisionX = (fltXCamera > fltPositionXTresor - fltTresorWidth) && (fltXCamera < fltPositionXTresor + fltTresorWidth);
    const binCollisionZ = (fltZCamera > fltPositionZTresor - fltTresorDepth) && (fltZCamera < fltPositionZTresor + fltTresorDepth);

//aucune collision retourn false
    return binCollisionX && binCollisionZ;
}