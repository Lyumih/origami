namespace $.$$ {

	export class $origami_app_atm extends $.$origami_app_atm {

		@$mol_mem
		static fetch_atms_data( limit?: number ) {
			const result = this.$.$mol_fetch
				.json( `https://origami-team.site/atm/all?offset=0&limit=${ limit || 50 }` ) as {
					id: string,
					address: string,
					distance?: number,
					longitude?: number,
					latitude?: number,
					allDay?: boolean,
					services: {
						name: string,
						serviceCapability: "string",
						serviceActivity: "string",
					}[]
				}[]

			const mocked = result.map( atm => ( { distance: JSON.stringify( atm ).length, ...atm } ) )
			return mocked.sort( ( a, b ) => Number( a.distance ) > Number( b.distance ) ? 1 : -1 )
		}

		@$mol_mem
		atms_data() {
			return this.$.$origami_app_atm.fetch_atms_data()
		}

		atms() {
			if( !this.filter_type() ) return this.atms_data()
			//TODO: добавить фильтрацию.
			return this.atms_data().filter( atm => {
				const dates = this.filter_type() === 'ind' ? atm.address.length % 2 : atm.address.length % 3
				return dates
			} )
		}

		atm_id( id: string ) {
			return this.atms().find( ( atm ) => atm.id == id )
		}

		atm_list(): readonly any[] {
			return this.atms().map( ( atm ) => this.Atm( atm.id ) )
		}

		atm_address( id: any ): string {
			return this.atm_id( id )?.address || ''
		}

		atm_distance( id: any ): string {
			const distance = this.atm_id( id )?.distance
			if( !distance ) return ''
			else if( distance > 1000 ) { return `${ ( distance / 1000 ).toFixed( 1 ) } км` }
			else { return `${ distance } м` }
		}

		atm_time( id: any ): string {
			return this.atm_id( id )?.allDay ? 'Круглосуточно' : '8:00-18:00'
		}


		@$mol_action
		open_map( id: string, next?: any ) {
			const atm = this.atm_id( id )
			console.log( next, atm )
			this.$.$mol_state_arg.go( { 'page': 'map', 'lat': String(atm?.latitude) || "", 'lon': String(atm?.longitude || '') } )
		}
	}
}
