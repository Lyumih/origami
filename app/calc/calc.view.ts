namespace $.$$ {
	export class $origami_app_calc extends $.$origami_app_calc {
		
		fetch_loan() {
			const uri = `https://origami-team.site/calc/?loan_amount=${this.amount()}&interest_rate=${this.rate()}&loan_term=${this.term()}`
			return this.$.$mol_fetch.json( uri )
		}
		loan_submit( next?: any ) {
			console.log( next )
			this.fetch_loan()
		}
		
	}
}
