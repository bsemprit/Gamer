class AddCurrentCharityToUsers < ActiveRecord::Migration
  def change
    add_column :users, :current_charity, :string
  end
end
