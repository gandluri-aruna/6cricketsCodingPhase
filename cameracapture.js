function isSoftwareCameraCovered(desiredDistanceRange, desiredLightRange, hardwareCameras) {
    const [minD, maxD] = desiredDistanceRange;
    const [minL, maxL] = desiredLightRange;

    const step = 0.1;

    for (let d = minD; d <= maxD; d += step) {
        for (let l = minL; l <= maxL; l += step) {
            let covered = false;
            for (let i = 0; i < hardwareCameras.length; i++) {
       const [[camMinD, camMaxD], [camMinL, camMaxL]] = hardwareCameras[i];
                if (camMinD <= d && d <= camMaxD && camMinL <= l && l <= camMaxL) {
                    covered = true;
                    break;
                }
            }
            if (!covered) {
                return false; 
            }
        }
    }

    return true; 
}
const desiredDistance = [1.0, 5.0];
const desiredLight = [100.0, 300.0];

const hardwareCameras = [
    [[1.0, 3.0], [100.0, 200.0]],
    [[3.0, 5.0], [100.0, 200.0]],
    [[1.0, 5.0], [200.0, 300.0]],
];

console.log(isSoftwareCameraCovered(desiredDistance, desiredLight, hardwareCameras));