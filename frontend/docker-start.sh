#!/bin/bash
./process-env2js.sh | tee ./build/env.js
exec yarn demo
