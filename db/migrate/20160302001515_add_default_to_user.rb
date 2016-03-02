class AddDefaultToUser < ActiveRecord::Migration
  def change
  	change_column_default(:users, :score, 0)
  	change_column_default(:users, :highscore, 0)
  end
end
