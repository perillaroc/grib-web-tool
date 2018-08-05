# GRIB Web Tool

A web tool collection for GRIB by perillaroc.

## Scanning Mode

Scanning mode table from [ECMWF website](http://apps.ecmwf.int/codes/grib/format/grib2/ftables/3/4).

Bit|Value|Meaning
---|---|---
1|0|Points of first row or column scan in the +i (+x) direction
1|1|Points of first row or column scan in the -i (-x) direction
2|0|Points of first row or column scan in the -j (-y) direction
2|1|Points of first row or column scan in the +j (+y) direction
3|0|Adjacent points in i (x) direction are consecutive
3|1|Adjacent points in j (y) direction is consecutive
4|0|All rows scan in the same direction
4|1|Adjacent rows scans in the opposite direction
5-8| |Reserved