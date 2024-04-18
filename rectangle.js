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

    /* // Contour avant
     tabVertex[2] = [
         1.0, 2.0, 1.0,
         -1.0, 2.0, 1.0,
         -1.0, -2.0, 1.0,
         1.0, -2.0, 1.0
     ];

     // Contour arrière
     tabVertex[3] = [
         1.0, 2.0, -1.0,
         -1.0, 2.0, -1.0,
         -1.0, -2.0, -1.0,
         1.0, -2.0, -1.0
     ];

     // Droites reliées aux 2 faces
     tabVertex[4] = [
         1.0, 1.0, -1.0, 1.0, 1.0, 1.0, //une ligne, une droite
         -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
         1.0, -1.0, -1.0, 1.0, -1.0, 1.0,
         -1.0, -1.0, -1.0, -1.0, -1.0, 1.0
     ];*/

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


    /* // Couleurs contour avant
     tabCouleurs[2] = [];
     for (var i = 0; i < 4; i++)
         tabCouleurs[2] = tabCouleurs[2].concat([1.0, 1.0, 1.0, 1.0]); // Blanc


     // Couleurs contour arrière
     tabCouleurs[3] = tabCouleurs[2];

     // Couleurs droites reliées aux 2 faces
     tabCouleurs[4] = tabCouleurs[2].concat(tabCouleurs[2]);*/

    // Création des tampons
    var tabObjCouleursCube = new Array();
    for (var i = 0; i < 6; i++) {
        tabObjCouleursCube[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursCube[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursCube;
}

// Pur faire tourner le Rectangle
function tournerRectangle() {
    switch (event.keyCode) {
        case 37: fltAutourY -= Math.PI / 90;
            break;
        case 39: fltAutourY += Math.PI / 90;
            break;
        case 38: fltAutourX -= Math.PI / 90;
            break;
        case 40: fltAutourX += Math.PI / 90;
            break;
    }
    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, tabObjRectangle, tabObjCouleursRectangle);
}
