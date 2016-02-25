class Chartity < ActiveRecord::Base
	has_many :users, through: :userCharities
	has_many :donations
end
