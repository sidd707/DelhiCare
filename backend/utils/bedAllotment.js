export const calculatePriority = (patient, score) => {
    const ageScore = 10 - Math.floor(patient.age / 10); // Younger patients get higher scores
    const severityScore = patient.existingMedicalCondition ? 5 : 0; // Adjust severity scoring logic
    const emergencyScore = patient.department === 'Emergency' ? 10 : 0;
    const icuScore = patient.department === 'ICU' ? 10 : 0;

    // Total score (admin score contributes to the priority)
    const totalScore = ageScore + severityScore + emergencyScore + icuScore + score;
    return totalScore;
};

// Function to get the best available bed
export const findBestBed = (patient, beds) => {
    const suitableBeds = beds.filter(bed => {
        if (bed.isOccupied) return false;
        if (patient.department === 'ICU' && bed.department !== 'ICU') return false;
        if (patient.department === 'Emergency' && bed.department !== 'Emergency') return false;
        if (patient.department === 'General' && bed.department !== 'General') return false;
        return true;
    });

    if (suitableBeds.length === 0) return null;

    // Sort by bed ID or other criteria if needed
    suitableBeds.sort((a, b) => a._id.toString().localeCompare(b._id.toString()));
    return suitableBeds[0];
};