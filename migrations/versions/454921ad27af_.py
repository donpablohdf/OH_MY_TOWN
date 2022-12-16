"""empty message

Revision ID: 454921ad27af
Revises: a92e74205551
Create Date: 2022-12-15 20:01:18.741857

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '454921ad27af'
down_revision = 'a92e74205551'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('actividades', schema=None) as batch_op:
        batch_op.add_column(sa.Column('activo', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('actividades', schema=None) as batch_op:
        batch_op.drop_column('activo')

    # ### end Alembic commands ###