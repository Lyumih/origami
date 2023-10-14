namespace $.$$ {
	export class $origami_app_bank extends $.$origami_app_bank {

		@$mol_mem
		banks_data() {
			const result = this.$.$mol_fetch
				.json( 'https://origami-team.site/office/all?offset=0&limit=150' ) as {
					id: string,
					salePointName?: string,
					address: string,
					type?: string,
					distance?: number,
					openHoursIndividual?: [],
					openHours?: [ { day: string, hours: null | string } ],
				}[]
			console.log(result)
			return result.sort((a, b) => Number(a.distance) > Number(b.distance) ? 1 : -1)
		}

		@$mol_mem
		banks() {
			if( !this.filter_type() ) return this.banks_data()
			return this.banks_data().filter( bank => {
				const dates = this.filter_type() === 'ind' ? bank.openHoursIndividual : bank.openHours
				return dates && dates[ 0 ]?.hours
			} )
		}

		bank_id( id: string ) {
			return this.banks().find( ( bank ) => bank.salePointName == id )
		}

		bank_list(): readonly any[] {
			return this.banks().map( ( bank ) => this.Bank( bank.salePointName ) )
		}

		bank_name( id: any ): string {
			return this.bank_id( id )?.salePointName || ''
		}

		bank_address( id: any ): string {
			return this.bank_id( id )?.address || ''
		}

		bank_distance( id: any ) {
			const distance = this.bank_id( id )?.distance
			if( !distance ) return ''
			else if( distance > 1000 ) { return `${ ( distance / 1000 ).toFixed( 1 ) } км` }
			else { return `${ distance } м` }
		}

		bank_time( id: any ): string {
			const time = this.bank_id( id )?.openHours?.[ 0 ]?.hours
			// console.log(time)
			return time ?? 'Выходной'
		}

		bank_workload( id: any ) {
			const workload = ( this.bank_id( id )?.salePointName?.length || 3 ) % 3
			return workload
		}
	}
}
