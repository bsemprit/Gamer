class Charity < ActiveRecord::Base
	has_many :users, through: :UserCharities
	has_many :users, through: :donations
end
