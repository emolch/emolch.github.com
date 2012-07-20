

function life(nx,ny) {
    
    this.nx = nx
    this.ny = ny
    this.field = new Array(ny);
    this.lastfield = new Array(ny);
    this.cells = new Array(ny);
    for (var iy=0; iy<this.ny; iy++) {
        this.field[iy] = new Array(nx);
        this.lastfield[iy] = new Array(nx);
        this.cells[iy] = new Array(nx);
        for (var ix=0; ix<this.nx; ix++) {
            this.field[iy][ix] = 0
            if (Math.abs(ix-this.nx/2) < this.nx/4 && 
                Math.abs(iy-this.ny/2) < this.ny/4 && Math.random()<0.1) 
                this.field[iy][ix] = 1;
        }
    }
    
    this.step = lifeStep;
    this.toStr = lifeToStr;
    this.makeCells = lifeMakeCells;
    this.adjustCells = lifeAdjustCells;
}

function lifeStep() {
    var lastfield = this.field;
    var field = this.lastfield;
    this.lastfield = lastfield;
    this.field = field;
    for (var iy=0; iy<this.ny; iy++) {
        for (var ix=0; ix<this.nx; ix++) {
            var ixm = (ix-1);
            var iym = (iy-1);
            if (ixm == -1) ixm = this.nx-1
            if (iym == -1) iym = this.ny-1
            var ixp = (ix+1) % this.nx;
            var iyp = (iy+1) % this.ny;
            
            var n = lastfield[iym][ixm] +
                lastfield[iym][ix] +
                lastfield[iym][ixp] +
                lastfield[iy][ixm] +
                lastfield[iy][ixp] +
                lastfield[iyp][ixm] +
                lastfield[iyp][ix] +
                lastfield[iyp][ixp];
            if (lastfield[iy][ix] == 0) {
                field[iy][ix] = (n==3) ? 1 : 0;
            } else {
                field[iy][ix] = (1<n && n<4) ? 1 : 0;
            }
        }
    }
}

function lifeToStr() {
    var bla = "";
    for (var iy=0; iy<this.ny; iy++) {
        for (var ix=0; ix<this.nx; ix++) {
            bla += (this.field[iy][ix]==1)?"o":" ";
        }
        bla += "\n";
    }
    return bla;
}

function lifeAdjustCells() {
    for (var iy=0; iy<this.ny; iy++) {
        for (var ix=0; ix<this.nx; ix++) {
            if (this.field[iy][ix] == 0) {
                this.cells[iy][ix].setAttribute("class", "celloff");
            } else {
                this.cells[iy][ix].setAttribute("class", "cellon");
            }
        }
    }    
}

function lifeMakeCells() {
    var table = document.createElement("table");
    table.setAttribute("class", "life");
    for (var iy=0; iy<this.ny; iy++) {
        var row = document.createElement("tr");
        table.appendChild(row);
        for (var ix=0; ix<this.nx; ix++) {
             var cell = document.createElement("td");
             row.appendChild(cell);
             var im = document.createTextNode(" ");
             cell.appendChild(im);
             cell.setAttribute("class", "cell");
             this.cells[iy][ix] = cell;
        }
    }
    return table;
}
