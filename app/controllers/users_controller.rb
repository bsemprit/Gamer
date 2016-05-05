class UsersController < ApplicationController

	def new
	end

	def create
	end

	def updatecharity
		user_charity = Charity.find_by(name: params[:charity])
		puts user_charity.inspect
		if current_user.charities.find_by(name: user_charity.name)
			current_user.current_charity = user_charity.name
			current_user.save!
			redirect_to user_path(current_user)
		else
			puts "not found *****************"
			current_user.charities << user_charity
			current_user.current_charity = user_charity.name
			current_user.save!
			puts current_user.current_charity
			puts current_user.charities.inspect
			redirect_to user_path(current_user)
		end
		
	end

	def show
		@user = current_user
		@current_charity = current_user.current_charity
		puts current_user.inspect
		render "profile"
	end
end
