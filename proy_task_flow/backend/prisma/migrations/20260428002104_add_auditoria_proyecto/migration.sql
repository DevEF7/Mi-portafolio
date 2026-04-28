-- AlterTable
ALTER TABLE "proyectos" ADD COLUMN     "actualizadoEn" TIMESTAMP(3),
ADD COLUMN     "actualizadoPorId" INTEGER;

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_actualizadoPorId_fkey" FOREIGN KEY ("actualizadoPorId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
