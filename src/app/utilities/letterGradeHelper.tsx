
export interface IGrade {
    Grade: "A" | "B" | "C" | "D" | "F";
    minimumValue: number;
}
export class LetterGradeHelper {
    
    static getletterGrade(value: number): string {
        const gradeThresholds: IGrade[] = [
            { Grade: 'A', minimumValue: 90 },
            { Grade: 'B', minimumValue: 80 },
            { Grade: 'C', minimumValue: 70 },
            { Grade: 'D', minimumValue: 60 },
        ];

        for (const gradeInfo of gradeThresholds) {
            if (value >= gradeInfo.minimumValue) {
                return gradeInfo.Grade;
            }
        }
        return 'F';
    };

}
