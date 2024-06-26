
function creerObj3DSol(objgl, longueurLargeurCarte, intNoTexture) {
	
    const obj3DSol = new Object();
    obj3DSol.fltProfondeur = longueurLargeurCarte - 1;
    obj3DSol.fltLargeur = longueurLargeurCarte - 1;
    obj3DSol.fltHauteur = 0;
    obj3DSol.vertex = creerVertexSol(objgl, obj3DSol.fltLargeur, obj3DSol.fltProfondeur , obj3DSol.fltHauteur);
    obj3DSol.couleurs = creerCouleursSol(objgl, [1, 1, 1, 1]);
	obj3DSol.texels = creerTexelsSol(objgl, obj3DSol.fltLargeur, obj3DSol.fltProfondeur, intNoTexture);
	obj3DSol.maillage = creerMaillageSol(objgl);
    obj3DSol.binVisible = true;
    obj3DSol.nom = "sol";
	
    obj3DSol.transformations = creerTransformations();
    return obj3DSol;
}

/* function creerVertexSol(objgl, fltLargeur, fltProfondeur) {
    const tabVertex = [
             -fltLargeur / 2, 0.0, -fltProfondeur / 2,
             fltLargeur / 2, 0.0, -fltProfondeur / 2,
             -fltLargeur / 2, 0.0, fltProfondeur / 2,
             fltLargeur / 2, 0.0, fltProfondeur / 2
        ];
    
    const objSol = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objSol);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objSol;
} */

function creerVertexSol(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
             0.0, fltHauteur, 0.0, // Top left corner
             fltLargeur, fltHauteur, 0.0, // Top right corner
             0.0, fltHauteur, fltProfondeur, // Bottom left corner
             fltLargeur, fltHauteur, fltProfondeur // Bottom right corner
        ];
    
    const objSol = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objSol);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objSol;
}

function creerCouleursSol(objgl, tabCouleur) {
    tabCouleurs = []; 
    for (let i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursSol = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursSol);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
  
    return objCouleursSol;
}

function creerTexelsSol(objgl, fltLargeur, fltProfondeur, intNoTexture) {
     const tabTexels = [
             0.0, 0.0,
             fltLargeur, 0.0,
             0.0, fltProfondeur,
             fltLargeur, fltProfondeur
        ];
    
    const objTexelsSol = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsSol);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    
    objTexelsSol.intNoTexture = intNoTexture; objTexelsSol.pcCouleurTexel = 1.0;
    
    return objTexelsSol;
  }

function creerMaillageSol(objgl) {

       const tabMaillage =
            [ // Les 2 triangles du sol
             0, 1, 2,
             1, 2, 3,
            ];

	    const objMaillageSol = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageSol);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageSol.intNbTriangles = 2;
        // Le nombre de droites
        objMaillageSol.intNbDroites = 0;
		
        return objMaillageSol;
    }
  
  
