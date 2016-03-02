class AddScoresToUsers < ActiveRecord::Migration
  def change
    add_column :users, :score, :integer
    add_column :users, :highscore, :integer
  end
end
