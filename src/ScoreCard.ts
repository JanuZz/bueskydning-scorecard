import { Flag } from "./Flags/Flags";

export type ArrowRound = {
  arrows: number[];
};

export class ScoreCard<arrowsPerEnd extends number = number> {
  public name: string = "";
  public rounds: ArrowRound[] = [];
	public handicap: number = 1;
	public nationality: Flag = "🇩🇰";

	constructor(public readonly arrowsPerEnd: arrowsPerEnd) { }
	
	public addRound(round?: ArrowRound) {
		if (round === undefined) {
			round = {
				arrows: []
			};
		}
		this.rounds.push(round);
	}

  public get total(): number {
    return this.rounds.reduce((total, round) => {
      return total + round.arrows.reduce((total, arrow) => total + arrow, 0);
    }, 0) * this.handicap;
  }

  public get avg(): number {
    const totalArrows = this.rounds.reduce((total, round) => {
      return total + round.arrows.length;
    }, 0);
    return this.total / totalArrows;
  }

  public static random(rounds: number = 5, arrowsPerEnd: number = 3) {
    const scoreCard = new ScoreCard(arrowsPerEnd);
    scoreCard.name = "Random";
    scoreCard.handicap = 1 + Math.random() * 0.2;
    scoreCard.rounds = [];

    for (let i = 0; i < rounds; i++) {
      const round = {
        arrows: [...Array(arrowsPerEnd)].map(() =>
          Math.floor(Math.random() * 11)
        ),
      } as ArrowRound;
      scoreCard.rounds.push(round);
    }

    return scoreCard;
  }

  public static fromCSV(csv: string) {
    const rows = csv.split("\n").filter((row) => row.trim().length > 0);

    if (rows === undefined || rows.length === 0) {
      throw new Error("No rows found");
    }

    const scorecard = new ScoreCard(rows[0].split("\t").length);
    rows.forEach((row, index) => {
      const columns = row.split("\t").map((column) => Number(column.trim()));
      console.log(columns);
      if (columns.some(isNaN)) {
        throw new Error(`Row ${index} contains NaN`);
      }

      if (columns.length !== scorecard.arrowsPerEnd) {
        throw new Error(
          `Row ${index} contains ${columns.length} columns, expected ${scorecard.arrowsPerEnd}`
        );
      }

      scorecard.rounds.push({
        arrows: columns,
      });
    });

    return scorecard;
  }
}
