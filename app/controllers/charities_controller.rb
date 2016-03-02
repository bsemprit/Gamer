class CharitiesController < ApplicationController

	def index
		@user = current_user
		@charities = Charity.all
	end
end
